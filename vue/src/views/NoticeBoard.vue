<template>
  <div
    class="home"
  >
    <Header
      id="titlebar"
      title="Quality Assurance"
      @select-editor="selectEditor"
      :buttonsActive=true
    />
    <Board
      @add-note="addNote"
      :notes="notes"
      :editorActive="editorActive"
      :editorId="editorId"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'NoticeBoard',
  components: {
    Header,
    Board
  },
  data () {
    return {
      notes: [],
      boardId: 1,
      editorActive: false,
      editorId: 0
    }
  },
  created () {
    if (!window.localStorage.getItem('mnb_atok')) { window.location = '/login' }
    this.refreshToken()
    this.fetchPosts()
  },
  methods: {
    refreshToken () {
      axios
        .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
        })
        .then(response => {
          window.localStorage.setItem('mnb_atok', response.data.accessToken)
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
              window.location = '/login'
              break
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    fetchPosts () {
      axios
        .get('http://localhost:1337/api/posts/all/' + this.boardId, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => { this.notes = response.data.posts })
        .catch(err => {
          switch (err.response.status) {
            case 401:
              window.location = '/login'
              break
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    },
    addNote () {
      this.refreshToken()
      this.fetchPosts()

      this.editorActive = false
    },
    selectEditor (selection) {
      this.editorActive = true
      this.editorId = selection
      console.log(selection)
    }
  }
}
</script>

<style scoped>
  .home {
    position: relative;
    display: grid;
    grid-template-rows: 70px 1fr;
  }

  .smooth-vuebar {
    max-height: 100vh;
    max-width: 100vw;
  }
</style>
