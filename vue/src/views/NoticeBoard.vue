<template>
  <div
    class="home"
  >
    <Header
      id="titlebar"
      @plus-clicked="plusClicked"
    />
    <Board
      :notes="notes"
    />
    <div
      v-if="this.editorActive"
      class="rightBar"
    >
      <EditorSidebar
        @add-note="addNote"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import EditorSidebar from '@/components/EditorSidebar.vue'

export default {
  name: 'NoticeBoard',
  components: {
    Header,
    Board,
    EditorSidebar
  },
  data () {
    return {
      notes: [],
      boardId: 1,
      editorActive: false
    }
  },
  created () {
    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardId)
      .then(response => { this.notes = JSON.parse(response.data) })
      .catch(err => console.log(err))
  },
  methods: {
    addNote () {
      // Refresh notice board
      axios
        .get('http://localhost:1337/api/posts/all/' + this.boardId)
        .then(response => { this.notes = JSON.parse(response.data) })
        .catch(err => console.log(err))

      this.editorActive = false
    },
    plusClicked () {
      // Show/hide editor sidebar
      this.editorActive = !this.editorActive
    }
  }
}
</script>

<style scoped>
  .home {
    position: relative;
  }

  .rightBar {
    position: fixed;
    top: 0px;
    right: 0px;
    width: 500px;
    height: 100vh;
    background: #fff;
  }
</style>
