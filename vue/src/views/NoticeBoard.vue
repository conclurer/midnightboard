<template>
  <div
    class="home"
  >
    <Header
      id="titlebar"
      title="Quality Assurance"
      @plus-clicked="plusClicked"
      @change-language="changeLanguage"
      :english="english"
      :buttonsActive=true
    />
    <Board
      @add-note="addNote"
      :notes="notes"
      :editorActive="editorActive"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import { i18n } from '@/main.js'

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
      english: true
    }
  },
  created () {
    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardId)
      .then(response => { this.notes = JSON.parse(response.data) })
      .catch(err => this.$log.error(err))

    switch (i18n.locale.substring(0, 2)) {
      case 'en':
        this.english = true
        break
      case 'de':
        this.english = false
        break
      default:
        this.english = true
    }
  },
  methods: {
    addNote () {
      // Refresh notice board
      axios
        .get('http://localhost:1337/api/posts/all/' + this.boardId)
        .then(response => { this.notes = JSON.parse(response.data) })
        .catch(err => this.$log.error(err))

      this.editorActive = false
    },
    plusClicked () {
      // Show/hide editor sidebar
      this.editorActive = !this.editorActive
    },
    changeLanguage () {
      this.english = !this.english
      if (this.english) {
        i18n.locale = 'en-GB'
      } else {
        i18n.locale = 'de-DE'
      }
      // TODO: Change user settings
      // User system does not exist yet.
    }
  }
}
</script>

<style scoped>
  .home {
    position: relative;
    overflow-x: hidden;
  }

  .smooth-vuebar {
    max-height: 100vh;
    max-width: 100vw;
  }
</style>
