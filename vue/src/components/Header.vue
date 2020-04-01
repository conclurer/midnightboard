<template>
  <header
    class="header"
  >
    <!-- Bootstrap-Vue navbar -->
    <b-navbar variant="dark" type="white" fixed="top">
      <b-navbar-brand href="#">
        <img src="../../../configuration/logo.png" height="40px" alt="Logo">
      </b-navbar-brand>
      <b-nav-text>
        |
      </b-nav-text>
      <b-nav-text>
        {{ title }}
      </b-nav-text>
      <b-navbar-nav class="ml-auto">
        <div>
          <!-- Note editor drop-down -->
          <b-nav-item-dropdown
            v-if="buttonsActive"
            id="plus"
            class="unselectable"
            unselectable="on"
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

          <!-- Profile page link -->
          <b-nav-item v-if="buttonsActive">
            <span
              class="unselectable"
              unselectable="on"
            ><font-awesome-icon icon="user-circle" /> {{$t('ui.profile')}}</span>
          </b-nav-item>

          <!-- Language selection drop-down -->
          <b-nav-item-dropdown
            id="flag"
            class="unselectable"
            unselectable="on"
            right
          >
            <template v-if="selLanguage === 'en'" v-slot:button-content>
              &#127468;&#127463;
            </template>
            <template v-else-if="selLanguage === 'de'" v-slot:button-content>
              &#127465;&#127466;
            </template>
            <b-dropdown-item @click="cToEN">&#127468;&#127463;</b-dropdown-item>
            <b-dropdown-item @click="cToDE">&#127465;&#127466;</b-dropdown-item>
          </b-nav-item-dropdown>

        </div>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import { i18n } from '@/main.js'
export default {
  name: 'Header',
  props: ['buttonsActive', 'title'],
  data () {
    return {
      selLanguage: ''
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
    // Used to load an editor to the sidebar
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
    }
  }
}
</script>

<style scoped>
  li {
    display: inline-block;
    margin: 0 10px;
  }

  .dropdown-menu {
    min-width: 3rem;
  }

  .header {
    width: 100%;
    max-height: 72px;
    color: #fff;
    font-size: 20pt;
  }

  .unselectable {
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  #flag {
    font-size: 25px;
    color: #fff
  }

  /* Alternative highlight styles:
   padding: 5px;
   border: 2px solid var(--accent);
   border-style: none none solid none;

   text-shadow: 1px 1px #aaa;

  */
</style>
