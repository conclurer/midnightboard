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
    <b-card
      class="loginBox"
      align="center"
      bg-variant="dark"
      text-variant="white"
    >
      <br>
      <form>
        <h2>{{$t('ui.welcome')}}</h2>
        <br>
        <input type="text" id="email" name="email" v-model="email" 
        minlength="3" maxlength="127" required
        :placeholder="$t('profile.email')" size="36">
        <br>
        <br>
        <input type="password" id="passwd" name="passwd" v-model="passwd" 
        minlength="8" maxlength="127" autocomplete="current-password" required
        :placeholder="$t('profile.password')" size="36">
        <br>
        <br>
        <button v-on:click.prevent="submit">{{$t('ui.login')}}</button>
        <br>
        <br>
        <router-link
          to="/register"
        >
          {{$t('ui.toSignUp')}}
        </router-link>
      </form>
    </b-card>
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
      email: '',
      passwd: '',
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
    submit () {
      axios
      .post('http://localhost:1337/api/users/login', {
        email: this.email,
        password: this.passwd
      })
      .then(response => { 
        window.localStorage.setItem('mnb_atok', response.data.accessToken)
        window.localStorage.setItem('mnb_rtok', response.data.refreshToken)
        window.location = '/'
      })
      .catch(err => {
        switch(err.response.status){
          case 400:
            // TODO Display Error
            break;
          case 500:
            this.$log.error(err);
            break;
          default:
            this.$log.error(err);
        }
      })

    },
    changeLanguage () {
      this.english = !this.english
      if (this.english) {
        i18n.locale = 'en-GB'
      } else {
        i18n.locale = 'de-DE'
      }
      // TODO: Change user settings
      // User system does not exist yet.
    }
  }
}
</script>

<style scoped>
  a {
    color: var(--link);
  }

  .login {
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
