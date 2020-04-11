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
          <b-overlay
              v-for="item in boardList"
              :key="item.id"
              class="navItemOverlay"
              v-bind:id="'nav-' + item.id"
              opacity="0.3"
              blur="1px"
              rounded="sm"
              spinner-type="none"
              variant="info"
              :show="isActive(item.id)"
          >
            <b-card @click="navClick(item.id)" class="navItem">
              {{item.boardName}}
            </b-card>
          </b-overlay>
          <br>
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
      options: { alwaysShowTracks: true },
      boardList: {},
      loading: false,
      highlightColor: 'aqua'
    }
  },
  created () {
    this.loading = true
    this.fetchBoards()
    this.loading = false
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
    navClick: function (id) {
      if (this.$route.params.boardId === id) { return }
      this.$router.push({
        name: 'Board',
        params: {
          boardId: id
        }
      })
        .then(() => this.$emit('board-changed'))
    },
    isActive: function (id) {
      return this.$route.params.boardId === id
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
      background: rgba(24,24,24,.9);
      top: 0;
      left: 0;
    }
    .navItem {
      cursor: pointer;
      font-weight: bold;
      font-size: 1.2rem;
      text-align: left;
      height: 100%;
      background:rgba(64, 64, 64, 0.6);
      color: white;
    }
    .navItem:hover {
      background:rgba(88, 88, 88, 0.6);
    }
    .navItemOverlay {
      cursor: pointer;
      margin: 0.75rem 2rem 0 2rem;
    }

    hr {
      border-top: 2px lightgray solid;
    }
</style>
