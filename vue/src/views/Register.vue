<template>
  <div
    class="register"
  >
    <Header
      id="titlebar"
      :title="$t('ui.register')"
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
        <input type="text" id="fname" name="fname" v-model="fname" required
          minlength="3" maxlength="20" :placeholder="$t('profile.firstName')" size="36">
        <br>
        <br>
        <input type="text" id="lname" name="lname" v-model="lname" required
          minlength="3" maxlength="20" :placeholder="$t('profile.lastName')" size="36">
        <br>
        <br>
        <input type="text" id="email" name="email" v-model="email" required
          minlength="3"  maxlength="127" :placeholder="$t('profile.email')" size="36">
        <br>
        <br>
        <input type="text" id="dispname" name="dispname" v-model="dispname" required
          minlength="3" maxlength="30" :placeholder="$t('profile.displayname')" size="36">
        <br>
        <br>
        <input type="password" id="passwd" name="passwd" v-model="passwd" required
          minlength="8" maxlength="127" autocomplete="new-password"
          :placeholder="$t('profile.password')" size="36">
        <br>
        <br>
        <input type="password" id="passwd2" name="passwd2" v-model="passwd2" required
          inlength="8" maxlength="127" autocomplete="new-password"
          :placeholder="$t('profile.confirmPassword')" size="36">
        <br>
        <br>
        <button v-on:click.prevent="submit">{{$t('ui.signUp')}}</button>
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
      fname: '',
      lname: '',
      dispname: '',
      email : '',
      passwd: '',
      passwd2: '',
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
    submit() {
      if(this.passwd !== this.passwd2){
          // TODO display error
          return
      }

      axios
      .post('http://localhost:1337/api/users/register', {
        userName: this.dispname,
        email: this.email,
        password: this.passwd,
        firstName: this.fname,
        lastName: this.lname
      })
      .then(response => { 
        window.localStorage.setItem('mnb_uid', response.data.id)
        window.location = '/login'
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
