<!-- This sidebar displays all notice board accessable for the user -->
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
          <br><br><br> <!-- These breaks are needed so the board list starts below the header bar -->
          <p class="panelHeading">{{$t('ui.boardSidebar.default')}}</p>
          <hr>
          <b-overlay
              key="boardDefault.id"
              class="navItemOverlay"
              v-bind:id="'nav-' + boardDefault.id"
              opacity="0.3"
              blur="1px"
              rounded="sm"
              spinner-type="none"
              variant="info"
              :show="isActive(undefined)"
          >
            <b-card @click="navClickDefault" class="navItem">
              {{boardDefault.boardName}}
            </b-card>
          </b-overlay>

          <p class="panelHeading">{{$t('ui.boardSidebar.public')}}</p>
          <hr>
          <b-overlay
              v-for="item in boardListPublic"
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

          <p class="panelHeading">{{$t('ui.boardSidebar.private')}}</p>
          <hr>
          <p class="panelFooting" v-if="!isLoggedIn()" @click="navClickLogin()"><a class="panelLink">{{$t('ui.boardSidebar.loginToViewA')}}</a>{{$t('ui.boardSidebar.loginToViewB')}}</p>
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
      boardList: [],
      boardListPublic: [],
      boardDefault: {},
      loading: false
    }
  },
  created () {
    this.loading = true
    this.fetchBoards()
    this.loading = false
  },
  methods: {
    // Used to load the all boards accessable for the user
    fetchBoards: async function () {
      await axios
        .get('http://localhost:1337/api/boards/all', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.boardList = response.data.boards
          this.boardListPublic = response.data.public
          this.boardDefault = response.data.default
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
    // Called when the user clicks on a board. He then gets forwarded to the board
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
    // Called when the user clicks on the default board button
    navClickDefault: function () {
      if (this.$route.path === '/') { return }
      this.boardId = this.boardDefault.id
      this.$router.push({
        name: 'Home'
      })
        .then(() => this.$emit('board-changed'))
    },
    // If the user isn't already at the login page, he gets forwarded there
    navClickLogin: function () {
      if (this.$route.path === '/login') { return }
      this.$router.push({
        name: 'Login'
      })
    },
    // Used to find out whether the user is logged in
    isLoggedIn: function () {
      return !!window.localStorage.getItem('mnb_rtok')
    },
    // Returns whether the board with the passed on id is currently displayed
    isActive: function (id) {
      if (typeof id === 'undefined' && this.$route.path !== '/') return null
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
    margin:  1rem 2rem 0.25rem 2rem;
  }

  hr {
    border-top: 1px gray solid;
    margin: 0 0 6px 0;
  }

  .panelHeading {
    padding-top: 1rem;
    padding-left: 1rem;
    margin: 0 0 -6px 0;
    color: gray;
    text-align: left;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .panelFooting {
    color: gray;
    text-align: center;
    font-size: 1rem;
  }

  .panelLink {
    font-weight: bold;
    color: dodgerblue;
  }

  .panelLink:hover {
    color: deepskyblue;
  }

  .panelLink:visited {
    color: dodgerblue;
  }
</style>
