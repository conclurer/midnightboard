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
    if (!window.localStorage.getItem('mnb_atok')){ window.location = '/login' }
    axios
      .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
      })
      .then(response => {
        window.localStorage.setItem('mnb_atok', response.data.accessToken)
      })
      .catch(err => {
        alert(err.response.config.token)
        this.$log.error(err.response.config.token)
        switch(err.response.status){
          case 400:
          case 403:
            window.location = '/login'
            break;
          case 500:
            this.$log.error(err)
            break;
          default:
            this.$log.error(err)
        }
      })

    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardId, {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
        }
      })
      .then(response => { this.notes = response.data.posts })
      .catch(err => {
        switch(err.response.status){
          case 400:
            window.location = '/login'
            break;
          case 401:
            break;
          case 500:
            this.$log.error(err)
            break;
          default:
            this.$log.error(err)
        }
      })

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
      if (!window.localStorage.getItem('mnb_atok')){ window.location = '/login' }
    axios
      .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
      })
      .then(response => {
        window.localStorage.setItem('mnb_atok', response.data.accessToken)
      })
      .catch(err => {
        this.$log.error(err.response.config.token)
        switch(err.response.status){
          case 400:
          case 403:
            window.location = '/login'
            break;
          case 500:
            this.$log.error(err)
            break;
          default:
            this.$log.error(err)
        }
      })

    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardId, {
        headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
        }
      })
      .then(response => { this.notes = response.data.posts })
      .catch(err => {
        switch(err.response.status){
          case 400:
            window.location = '/login'
            break;
          case 401:
            break;
          case 500:
            this.$log.error(err)
            break;
          default:
            this.$log.error(err)
        }
      })

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
