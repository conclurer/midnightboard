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
          <b-nav-item v-if="addActive">
            <span
              class="unselectable"
              unselectable="on"
            ><a @click="plusClicked"><font-awesome-icon icon="plus" /> {{$t('ui.add')}}</a></span>
          </b-nav-item>
          <b-nav-item v-if="profileActive">
            <span
              class="unselectable"
              unselectable="on"
            ><font-awesome-icon icon="user-circle" /> {{$t('ui.profile')}}</span>
          </b-nav-item>

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
      // Send up to parent
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
    color: #FFF
  }

  /* Alternative highlight styles:
   padding: 5px;
   border: 2px solid var(--accent);
   border-style: none none solid none;

   text-shadow: 1px 1px #aaa;

  */
</style>
