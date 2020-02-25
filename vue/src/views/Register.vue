<template>
  <div
    class="register"
  >
    <Header
      id="titlebar"
      title="Sign Up"
      @change-language="changeLanguage"
      :english="english"
      :buttonsActive=false
    />
    <b-card
      class="loginBox"
      align="center"
      bg-variant="dark"
      text-variant="white"
    >
      <br>
      <form>
        <h2 v-html="$t('ui.createAccount')"></h2>
        <br>
        <input type="text" id="fname" name="fname" :placeholder="$t('profile.firstName')" size="36">
        <br>
        <br>
        <input type="text" id="lname" name="lname" :placeholder="$t('profile.lastName')" size="36">
        <br>
        <br>
        <input type="text" id="email" name="email" :placeholder="$t('profile.email')" size="36">
        <br>
        <br>
        <input type="text" id="passwd" name="passwd" :placeholder="$t('profile.password')" size="36">
        <br>
        <br>
        <input type="submit" :value="$t('ui.signUp')">
        <br>
        <br>
        <router-link
          to="/login"
        >
          {{$t('ui.toLogin')}}
        </router-link>
      </form>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
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
.register {
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background: var(--background-board);
  height: 100vh;
}

.loginBox {
  width: 400px;
  margin: 20px auto;
}
</style>
