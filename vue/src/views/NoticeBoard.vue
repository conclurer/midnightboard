<template>
  <div class="home">
    <Header
      id="titlebar"
      :title="boardTitle"
      @select-editor="selectEditor"
      @board-changed="reload"
      :addActive="true"
      :profileActive="true"
    />
    <b-overlay
      :show="loading"
      variant="light"
      opacity="0.6"
      blur="2px"
      rounded="sm"
    >
      <Board
        @add-note="addNote"
        @reload-board="reload"
        @close="close"
        :notes="notes"
        :boardId="boardId"
        :editorActive="editorActive"
        :editorId="editorId"
      />
    </b-overlay>
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
      editorActive: false,
      editorId: 0,
      boardId: 1,
      boardTitle: '',
      loading: false
    }
  },
  created () {
    if (!window.localStorage.getItem('mnb_atok')) { this.$router.push({ name: 'Login' }) }
    this.reload()
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
            case 404:
              this.$router.push({ name: '404' })
              break
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    },
    fetchBoard: async function () {
      axios
        .get('http://localhost:1337/api/boards/' + this.boardId, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => { this.boardTitle = response.data.boardName })
        .catch(err => {
          switch (err.response.status) {
            case 401:
              this.$router.push({ name: 'Login' })
              break
            case 404:
              this.$router.push({ name: '404' })
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
    },
    reload: function () {
      this.loading = true
      this.boardId = this.$route.params.boardId
      this.refreshToken()
      this.fetchBoard()
      this.fetchPosts()
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
