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
        <img src="../../../configuration/logo.png" alt="Logo" class="navImg" @click="logoClick">
      </b-navbar-brand>
      <b-nav-text id="navTitle">
        {{ title }}
      </b-nav-text>
      <b-navbar-toggle target="navbar-toggle-collapse" >
        <template>
          <font-awesome-icon icon="caret-down" />
        </template>
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav >
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
              class="navItem"
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
            class="navItem"
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
            class="navItem pr-3"
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
import BoardSidebar from '@/components/BoardSidebar.vue'
import { logoutUser } from '@/mixins/logoutUser.js'

export default {
  name: 'Header',
  props: ['addActive', 'title'],
  mixins: [logoutUser],
  components: { BoardSidebar },
  data () {
    return {
      selLanguage: '',
      avatarText: '',
      boardSidebarToggle: false
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
  },
  methods: {
    cToEN: function (e) {
      e.preventDefault()
      if (this.selLanguage === 'en') { return }
      window.localStorage.setItem('mnb_lang', 'en-GB')
      this.selLanguage = 'en'
      i18n.locale = 'en-GB'
    },
    cToDE: function (e) {
      e.preventDefault()
      if (this.selLanguage === 'de') { return }
      window.localStorage.setItem('mnb_lang', 'de-DE')
      this.selLanguage = 'de'
      i18n.locale = 'de-DE'
    },
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
    avatarLogout: function () {
      this.logout()
    },
    avatarLogin: function () {
      if (this.$route.path === '/login') { return }
      this.$router.push({
        name: 'Login'
      })
    },
    avatarRegister: function () {
      if (this.$route.path === '/register') { return }
      this.$router.push({
        name: 'Register'
      })
    },
    avatarCMS: function () {
      if (this.$route.path === '/cms') { return }
      this.$router.push({
        name: 'CMS'
      })
    },
    logoClick: function () {
      this.boardSidebarToggle = !this.boardSidebarToggle
    },
    boardChanged: function () {
      this.boardSidebarToggle = false
      this.$emit('board-changed')
    },
    isLoggedIn: function () {
      return !!window.localStorage.getItem('mnb_rtok')
    },
    isLoggedInAsAdmin: function () {
      return window.localStorage.getItem('mnb_rid') === '0'
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
  .navImg {
    padding-left: 1vw;
    height: 35px;
  }

  #navTitle {
    padding: 0 0 0 5vw;
    color: white;
    font-size: calc(12pt + 0.8vh);
  }

  .navItem {
    margin-top: -5px;
    padding-right: 5px;
    font-size: calc(12pt + 0.75vw);
  }

  .navAvatar {
    padding: 0px;
    margin: 0px;
    font-size: 0.9rem;
  }

</style>
