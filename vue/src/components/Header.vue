<!-- This header is displayed on top of every view. Some buttons can be set visible or invisible -->
<template>
  <div>
    <b-navbar
      variant="dark"
      type="dark"
      toggleable="sm"
      fixed="top"
      class="m"
    >
      <b-navbar-brand href="#">
        <img src="../../../configuration/logo.png" alt="Logo" class="nav-img" @click="logoClick">
      </b-navbar-brand>
      <b-nav-text class="nav-title">
        {{ title }}
      </b-nav-text>
      <b-navbar-item class="nav-sub" v-if="boardVisible && isLoggedIn()">
        <b-button variant="link" @click="changeSubscriberMode()">
          <font-awesome-icon v-if="!boardSubscribed" icon="bell-slash" size="lg" />
          <font-awesome-icon v-else-if="boardSubscribed" icon="bell" size="lg" />
        </b-button>
      </b-navbar-item>
      <b-navbar-toggle target="navbar-toggle-collapse" >
        <template>
          <font-awesome-icon icon="caret-down" />
        </template>
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav >
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
              class="nav-item"
              right
              no-caret
          >
            <template v-slot:button-content>
              <b-avatar
                variant="info"
                class="p-0"
                button
                :text="avatarText"
              />
            </template>
            <b-dropdown-item v-if="isLoggedIn()" @click="avatarProfile">{{$t('ui.profile')}}</b-dropdown-item>
            <b-dropdown-item v-if="isLoggedIn()" @click="avatarEdit">{{$t('ui.edit')}}</b-dropdown-item>
            <b-dropdown-item v-if="isLoggedIn()" @click="avatarLogout">{{$t('ui.logout')}}</b-dropdown-item>

            <b-dropdown-item v-if="!isLoggedIn()" @click="avatarLogin">{{$t('ui.login')}}</b-dropdown-item>
            <b-dropdown-item v-if="!isLoggedIn()" @click="avatarRegister">{{$t('ui.register')}}</b-dropdown-item>

            <b-dropdown-divider v-if="isLoggedInAsAdmin()"/>
            <b-dropdown-item v-if="isLoggedInAsAdmin()" @click="avatarCMS">{{$t('cms.title')}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            v-if="addActive"
            class="nav-item"
            right
            no-caret
          >
            <template v-slot:button-content>
              <font-awesome-icon icon="plus" />
            </template>
            <b-dropdown-item @click="selectEditor('text')">{{$t('type.text')}}</b-dropdown-item>
            <b-dropdown-item @click="selectEditor('image')">{{$t('type.image')}}</b-dropdown-item>
            <b-dropdown-item @click="selectEditor('file')">{{$t('type.file')}}</b-dropdown-item>
            <b-dropdown-item @click="selectEditor('poll')">{{$t('type.poll')}}</b-dropdown-item>
            <b-dropdown-item @click="selectEditor('survey')">{{$t('type.survey')}}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            class="nav-item pr-3"
            right
            no-caret
          >
            <template v-if="selLanguage === 'en'" v-slot:button-content>
              &#127468;&#127463;
            </template>
            <template v-else-if="selLanguage === 'de'" v-slot:button-content>
              &#127465;&#127466;
            </template>
            <b-dropdown-item @click="cToEN" variant="secondary">&#127468;&#127463;</b-dropdown-item>
            <b-dropdown-item @click="cToDE" variant="secondary">&#127465;&#127466;</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <keep-alive>
      <BoardSidebar
        v-if="boardSidebarToggle"
        @board-changed="boardChanged"
      />
    </keep-alive>
  </div>
</template>

<script>
import { i18n } from '@/main.js'
import axios from 'axios'
import BoardSidebar from '@/components/BoardSidebar.vue'
export default {
  name: 'Header',
  props: ['addActive', 'title'],
  components: { BoardSidebar },
  data () {
    return {
      selLanguage: '',
      avatarText: '',
      boardSidebarToggle: false,
      boardVisible: false,
      boardSubscribed: false
    }
  },
  created () {
    switch (i18n.locale.substring(0, 2)) {
      case 'de':
        this.selLanguage = 'de'
        break
      case 'en':
      default:
        this.selLanguage = 'en'
    }
    this.avatarText = window.localStorage.getItem('mnb_inits')
    this.isNoticeBoard()
  },
  updated () {
    this.isNoticeBoard()
  },
  methods: {
    // Used to change the selected language to English
    cToEN: function (e) {
      e.preventDefault()
      if (this.selLanguage === 'en') { return }
      window.localStorage.setItem('mnb_lang', 'en-GB')
      this.selLanguage = 'en'
      i18n.locale = 'en-GB'
    },
    // Used to change the selected language to German
    cToDE: function (e) {
      e.preventDefault()
      if (this.selLanguage === 'de') { return }
      window.localStorage.setItem('mnb_lang', 'de-DE')
      this.selLanguage = 'de'
      i18n.locale = 'de-DE'
    },
    // This method is called when the user selects an editor from the drop-down and emits the editor id to the NoticeBoard view
    selectEditor: function (selection) {
      switch (selection) {
        case 'text':
          this.$emit('select-editor', 0)
          break
        case 'image':
          this.$emit('select-editor', 1)
          break
        case 'file':
          this.$emit('select-editor', 2)
          break
        case 'poll':
          this.$emit('select-editor', 3)
          break
        case 'survey':
          this.$emit('select-editor', 4)
          break
        default:
      }
    },
    // This method forwards the user to his profile page
    avatarProfile: function () {
      if (this.$route.params.userId === window.localStorage.getItem('mnb_uid')) {
        this.$emit('profile-changed-to-view')
        return
      }
      this.$router.push({
        name: 'Profile',
        params: {
          userId: window.localStorage.getItem('mnb_uid'),
          editable: false
        }
      })
        .then(() => this.$emit('profile-changed'))
    },
    // Used to get to the profile page in editing mode
    avatarEdit: function () {
      if (this.$route.params.userId === window.localStorage.getItem('mnb_uid')) {
        this.$emit('profile-changed-to-edit')
        return
      }
      this.$router.push({
        name: 'Profile',
        params: {
          userId: window.localStorage.getItem('mnb_uid'),
          editable: true
        }
      })
        .then(() => this.$emit('profile-changed'))
    },
    // Called when users want to log out
    avatarLogout: function () {
      axios.defaults.headers = {
        'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
      }
      axios
        .delete('http://localhost:1337/api/users/logout')
        .then(response => {
          window.localStorage.clear()
          this.$router.push({ name: 'Login' })
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
    // This method forwards the user to the login page
    avatarLogin: function () {
      if (this.$route.path === '/login') { return }
      this.$router.push({
        name: 'Login'
      })
    },
    // This method forwards the user to the registration page
    avatarRegister: function () {
      if (this.$route.path === '/register') { return }
      this.$router.push({
        name: 'Register'
      })
    },
    // This method forwards the user to the CMS page
    avatarCMS: function () {
      if (this.$route.path === '/cms') { return }
      this.$router.push({
        name: 'CMS'
      })
    },
    // When the user clicks at the logo the board sidebar is displayed/hidden
    logoClick: function () {
      this.boardSidebarToggle = !this.boardSidebarToggle
    },
    // Called when the notice board was changed
    boardChanged: function () {
      this.boardSidebarToggle = false
      this.$emit('board-changed')
    },
    // Finds out whether the user is logged in
    isLoggedIn: function () {
      return !!window.localStorage.getItem('mnb_rtok')
    },
    // Finds out whether the user is an admin (Super-User)
    isLoggedInAsAdmin: function () {
      return window.localStorage.getItem('mnb_rid') === '0'
    },
    isSubscriber: async function () {
      // Check if user has subscribed current board
      if (this.isLoggedIn) {
        axios.defaults.headers = {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
        }
        await axios.get('http://localhost:1337/api/users/subscriptions')
          .then(async response => {
            var brdId = parseInt(this.$route.params.boardId)
            if (brdId) {
              for (const boardId of response.data) {
                if (boardId === brdId) {
                  this.boardSubscribed = true
                  return
                }
              }
            }
            this.boardSubscribed = false
          })
          .catch(err => {
            this.$log.error(err)
          })
      }
    },
    changeSubscriberMode: async function () {
      // (Un-)Subscribe user to current board
      if (this.isLoggedIn) {
        const userId = window.localStorage.getItem('mnb_uid')
        const boardId = this.$route.params.boardId ? this.$route.params.boardId : 0
        const suffix = '/' + userId + '/' + boardId
        const language = window.localStorage.getItem('mnb_lang')
          ? window.localStorage.getItem('mnb_lang') : this.selLanguage
        axios.defaults.headers = {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
          'Accept-Language': language
        }
        if (this.boardSubscribed) {
          // Unsubscribe
          await axios.put('http://localhost:1337/api/users/unsubscribe' + suffix, {
          })
            .then(response => {})
            .catch(err => {
              this.$log.error(err)
            })
        } else {
          // Subscribe
          await axios.put('http://localhost:1337/api/users/subscribe' + suffix, {
          })
            .then(response => {})
            .catch(err => {
              this.$log.error(err)
            })
        }
        this.boardSubscribed = !this.boardSubscribed
      }
    },
    isNoticeBoard: function () {
      // Check if a notice board is open and user is logged in
      // Default board is not subscribable
      if (this.$route.path.startsWith('/board') && this.isLoggedIn) {
        this.boardVisible = true
        this.isSubscriber()
      } else {
        this.boardVisible = false
      }
    }
  }
}
</script>

<style scoped>
  .m {
    padding: 0;
    border-bottom: 1px black solid;
    position: fixed;
  }

  .nav-img {
    padding-left: 1vw;
    height: 35px;
  }

  .nav-title {
    padding: 0 0 0 5vw;
    color: white;
    font-size: calc(12pt + 0.8vh);
  }

  .nav-sub {
    padding: 0 0 0 1vw;
    color: white;
  }

  .btn-link {
    color: white;
    background-color: transparent;
    border: none;
  }

  .btn-link:hover {
    color: red;
  }

  .nav-item {
    margin-top: -5px;
    padding-right: 5px;
    font-size: calc(12pt + 0.75vw);
  }

  .nav-avatar {
    padding: 0px;
    margin: 0px;
    font-size: 0.9rem;
  }
</style>
