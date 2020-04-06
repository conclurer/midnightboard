<template>
  <div class="home">
    <Header
      id="titlebar"
      title="Quality Assurance"
      @select-editor="selectEditor"
      :addActive="true"
      :profileActive="true"
    />
    <Board
      @add-note="addNote"
      @close="close"
      :notes="notes"
      :boardId="boardId"
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
    if (!window.localStorage.getItem('mnb_atok')) { this.$router.push({ name: 'Login' }) }
    this.refreshToken()
    this.fetchPosts()
  },
  methods: {
    refreshToken: async function () {
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
              this.$router.push({ name: 'Login' })
              break
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    fetchPosts: async function () {
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
              this.$router.push({ name: 'Login' })
              break
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    },
    addNote: async function () {
      this.refreshToken()
      this.fetchPosts()

      this.editorActive = false
    },
    selectEditor: function (selection) {
      this.editorActive = true
      this.editorId = selection
    },
    close: function () {
      this.editorActive = false
    }
  }
}
</script>

<style scoped>
  .home {
    padding: 42px 0 0 0;
  }
</style>
