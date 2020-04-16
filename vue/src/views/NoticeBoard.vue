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
    addNote: async function () {
      await this.refreshToken()
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
  .loadingOverlay {
    top:0;
    left:0;
    min-height: 95vh;
    width: 100vw;
  }
</style>
