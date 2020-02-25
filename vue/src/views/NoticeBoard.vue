<template>
  <div
    class="home"
  >
    <Header
      id="titlebar"
      @plus-clicked="plusClicked"
      @change-language="changeLanguage"
      :english="english"
    />
    <Board
      :notes="notes"
    />
    <div
      v-show="this.editorActive"
      class="rightBar"
    >
      <div>
        <div v-smoothscrollbar="{ listener, options }">
          <EditorSidebar
            @add-note="addNote"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import EditorSidebar from '@/components/EditorSidebar.vue'
import { i18n } from '@/main.js'

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
      editorActive: false,
      english: true,
      listener: () => {},
      options: {}
    }
  },
  created () {
    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardId)
      .then(response => { this.notes = JSON.parse(response.data) })
      .catch(err => console.log(err))

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
        .catch(err => console.log(err))

      this.editorActive = false
    },
    plusClicked () {
      // Show/hide editor sidebar
      this.editorActive = !this.editorActive
      // Place sidebar below titlebar
      document.getElementsByClassName('rightBar')[0].style.top = document.getElementsByClassName('navbar')[0].clientHeight + 'px'
    },
    changeLanguage () {
      this.english = !this.english
      if (this.english) {
        i18n.locale = 'en-GB'
      } else {
        i18n.locale = 'de-DE'
      }

      console.log(i18n.locale)
      // TODO: Change user settings
      // User system does not exist yet.
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
    right: 0px;
    width: 500px;
    height: 100vh;
    background: #fff;
  }

  .smooth-vuebar {
    max-height: 100vh;
    max-width: 100vw;
  }
</style>
