<template>
  <b-navbar
    variant="dark"
    type="dark"
    toggleable="sm"
    fixed="top"
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
        <b-nav-item v-if="addActive" class="navItem">
          <a @click="plusClicked"><font-awesome-icon icon="plus" /> {{$t('ui.add')}}</a>
        </b-nav-item>
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
            <b-dropdown-item @click="cToEN">&#127468;&#127463;</b-dropdown-item>
            <b-dropdown-item @click="cToDE">&#127465;&#127466;</b-dropdown-item>
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
    plusClicked (e) {
      e.preventDefault()
      this.$emit('plus-clicked')
    },
    cToEN (e) {
      e.preventDefault()
      if (this.selLanguage === 'en') { return }
      window.localStorage.setItem('mnb_lang', 'en-GB')
      this.selLanguage = 'en'
      i18n.locale = 'en-GB'
    },
    cToDE (e) {
      e.preventDefault()
      if (this.selLanguage === 'de') { return }
      window.localStorage.setItem('mnb_lang', 'de-DE')
      this.selLanguage = 'de'
      i18n.locale = 'de-DE'
    }
  }
}
</script>

<style scoped>

  .navImg {
    max-height: 3vh;
    min-height: 30px;
  }

  #navTitle {
    padding: 0 0.5vw 0 3vw;
    color: white;
    font-size: calc(12pt + 0.8vh);
  }

  .navItem {
    font-size: calc(12pt + 0.8vh);
  }

</style>
