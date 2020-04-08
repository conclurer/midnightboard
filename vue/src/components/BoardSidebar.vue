<template>
  <div class="boardSidebar">
    <div class="menu" v-smoothscrollbar="{ listener, options }">
        <b-overlay
            :show="loading"
            variant="light"
            opacity="0.6"
            blur="2px"
            rounded="sm"
        >
          <br><br>
          <hr>
          <b-nav-item class="navItem" v-for="item in boardList" :key="item.id">{{item.boardName}}</b-nav-item>
        </b-overlay>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      listener: () => {},
      options: { alwaysShowTracks:true },
      boardList: {},
      loading: false
    }
  },
  created () {
    this.loading = true
    this.fetchBoards()
    this.loading = false
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
    }
  }
}
</script>

<style scoped>
    .menu {
        position: fixed;
        z-index: 1000;
        list-style: none;
        min-width: 350px;
        max-width: 100%;
        min-height: 100vh;
        background-color: rgba(24,24,24,.9);
        top: 0;
        left: 0;
    }
    .navItem {
      font-weight: bold;
      font-size: 1.2rem;
    }

    hr {
      border-top: 2px lightgray solid;
    }
</style>
