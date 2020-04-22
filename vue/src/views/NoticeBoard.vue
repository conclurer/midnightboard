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
      class="loading-overlay"
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
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import { axios } from '@/mixins/axios.js'

export default {
  name: 'NoticeBoard',
  mixins: [axios],
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
    // This method is used to load the posts of a notice board from the database
    fetchPosts: async function () {
      const isAuthed = !!window.localStorage.getItem('mnb_rtok')
      await this.axiosGET('api/posts/all/' + this.boardId, null, isAuthed, false)
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
      const isAuthed = !!window.localStorage.getItem('mnb_rtok')
      return await this.axiosGET('api/boards/' + this.boardId, null, isAuthed, isAuthed)
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
      if (await this.fetchBoard()) { await this.fetchPosts() }
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .loading-overlay {
    top:0;
    left:0;
    min-height: 95vh;
    width: 100vw;
  }
</style>
