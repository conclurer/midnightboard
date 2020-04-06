<template>
  <b-navbar
    variant="dark"
    type="dark"
    toggleable="sm"
    fixed="top"
    class="m"
  >
    <b-navbar-brand href="#">
      <img src="../../../configuration/logo.png" alt="Logo" class="navImg">
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
            v-if="addActive"
            class="navItem"
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

        <b-nav-item v-if="profileActive" class="navItem">
          <font-awesome-icon icon="user-circle" /> {{$t('ui.profile')}}
        </b-nav-item>
        <b-nav-item-dropdown
            class="navItem"
            right
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
</template>

<script>
import { i18n } from '@/main.js'
export default {
  name: 'Header',
  props: ['addActive', 'profileActive', 'title'],
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
  .m {
    padding: 0;
    border-bottom: 1px black solid;
  }
  .navImg {
    padding: 0;
    height: 35px;
  }

  #navTitle {
    padding: 0 0 0 5vw;
    color: white;
    font-size: calc(12pt + 0.8vh);
  }

  .navItem {
    font-size: calc(12pt + 0.8vh);
  }

</style>
