<template>
  <div
    class="login"
  >
    <Header
      id="titlebar"
      title="Login"
      @change-language="changeLanguage"
      :english="english"
      :buttonsActive=false
    />
    <div class="loginBox" align="center">
      <br>
      <form>
        <h2>Login</h2>
        <br>
        <input type="text" id="fname" name="fname" :placeholder="$t('profile.email')" size="36">
        <br>
        <br>
        <input type="text" id="lname" name="lname" :placeholder="$t('profile.password')" size="36">
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Header from '@/components/Header.vue'
import { i18n } from '@/main.js'

export default {
  name: 'NoticeBoard',
  components: {
    Header
  },
  data () {
    return {
      english: true
    }
  },
  created () {
    switch (i18n.locale.substring(0, 2)) {
      case 'en':
        this.english = true
        break
      case 'de':
        this.english = false
        break
      default:
        this.english = true
    }
  },
  methods: {
    changeLanguage () {
      this.english = !this.english
      if (this.english) {
        i18n.locale = 'en-GB'
      } else {
        i18n.locale = 'de-DE'
      }

      console.log(i18n.locale)
      // TODO: Change user settings
      // User system does not exist yet.
    }
  }
}
</script>

<style scoped>
@import '../../../configuration/styles.css';
.login {
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background: var(--background-board);
  height: 100vh;
}

.loginBox {
    margin: 0 auto;
}
</style>
