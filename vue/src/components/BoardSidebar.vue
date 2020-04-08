<template>
  <div class="boardSidebar">
    <div class="menu" v-smoothscrollbar="{ listener, options }">
      <b-nav-item v-for="item in boardList" :key="item.id">{{item.boardName}}</b-nav-item>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
        listener: () => {},
        options: {},
        boardList: {}
    }
  },
  created () {
    this.fetchBoards()
  },
  computed: {
    
  },
  methods: {
    fetchBoards: async function () {
      await axios
        .get('http://localhost:1337/api/boards/all', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.boardList = response.data
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
    },
  }
}
</script>

<style scoped>
    .menu {
        position: fixed;
        z-index: 1000;
        list-style: none;
        min-width: 200px;
        max-width: 100%;
        min-height: 100vh;
        background-color: rgba(24,24,24,.9);
        padding-top: 2vh;
    }
</style>
