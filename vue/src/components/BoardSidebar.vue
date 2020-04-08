<template>
  <div
    class="boardSidebar"
    v-smoothscrollbar="{ listener, options }"
  >
    <br>
    {{$t('ui.boards')}}
    <hr>
    <!-- TODO: Display all board names -->
    <br><br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoardSidebar',
  components: {
  },
  data () {
    return {
      listener: () => {},
      options: {},
      boards: []
    }
  },
  props: [],
  created  () {
    this.loadBoardData()
  },
  methods: {
    refreshToken: async function () {
      await axios
        .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
        })
        .then(response => {
          window.localStorage.setItem('mnb_atok', response.data.accessToken)
        })
        .catch(err => {
          this.$log.error(err.response.config.token)
          switch (err.response.status) {
            case 500:
              this.$log.error(err)
              break
            default:
              this.$log.error(err)
          }
        })
    },
    loadBoardData: async function () {
      this.loading = true
      this.refreshToken()
      await axios
        .get('http://localhost:1337/api/boards/all', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.boards = response.data
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
      this.totalRows = this.boards.length
      this.loading = false
    },
    // Used to close the editor sidebar
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  hr {
    height: 1px;
    border: none;
    background-color: #aaa;
  }
</style>
