<!-- Parent component for all notice boards. Essential data is saved here -->
<template>
  <div class="home">
    <Header
      id="titlebar"
      :title="boardTitle"
      @select-editor="selectEditor"
      @board-changed="reload"
      :addActive="headerButtonsActive"
    />
    <b-overlay
      :show="loading"
      variant="light"
      opacity="0.6"
      blur="2px"
      rounded="sm"
      class="loadingOverlay"
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
      loading: false,
      headerButtonsActive: false
    }
  },
  created () {
    this.reload()
  },
  methods: {
    // Called to refresh the access token
    refreshToken: function () {
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
    // This method is used to load the posts of a notice board from the database
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
              this.$router.push({ name: 'NotFound' })
              break
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    },
    // This method is called to load notice board properties
    fetchBoard: async function () {
      return await axios
        .get('http://localhost:1337/api/boards/' + this.boardId, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.boardTitle = response.data.boardName
          this.boardId = response.data.id
          return true
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
              this.$router.push({ name: 'Login' })
              return false
            case 404:
              this.$router.push({ name: 'NotFound' })
              return false
            case 500:
            case 400:
            default:
              this.$log.error(err)
              return false
          }
        })
    },
    // Called after a note was created
    addNote: async function () {
      this.refreshToken()
      this.fetchPosts()
      this.editorActive = false
    },
    // Sets the editor id which is used in the editor sidebar
    selectEditor: function (selection) {
      this.editorActive = true
      this.editorId = selection
    },
    // Used to close the editor sidebar
    close: function () {
      this.editorActive = false
    },
    // Used to update the note array in data
    reload: async function () {
      this.loading = true
      this.notes = []
      if (window.localStorage.getItem('mnb_rtok')) { this.headerButtonsActive = true } else { this.headerButtonsActive = false }
      this.boardId = this.$route.params.boardId ? this.$route.params.boardId : 0
      if (window.localStorage.getItem('mnb_rtok')) { this.refreshToken() }
      if (await this.fetchBoard()) { await this.fetchPosts() }
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .loadingOverlay {
    top:0;
    left:0;
    min-height: 95vh;
    width: 100vw;
  }
</style>
