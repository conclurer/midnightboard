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
        <p v-if="err.includes(107)" style="color: #E22">{{$t('register.malFirstName')}}</p>
        <br v-else>
        <br>
        <input type="text" id="lname" name="lname" v-model="lname" required
          minlength="3" maxlength="20" :placeholder="$t('profile.lastName')" size="36">
        <p v-if="err.includes(106)" style="color: #E22">{{$t('register.malLastName')}}</p>
        <br v-else>
        <br>
        <input type="text" id="email" name="email" v-model="email" required
          minlength="3"  maxlength="127" :placeholder="$t('profile.email')" size="36">
        <p v-if="err.includes(104)" style="color: #E22">{{$t('register.malEmail')}}</p>
        <br v-else>
        <br>
        <input type="text" id="dispname" name="dispname" v-model="dispname" required
          minlength="3" maxlength="30" :placeholder="$t('profile.displayname')" size="36">
        <p v-if="err.includes(105)" style="color: #E22">{{$t('register.malUsername')}}</p>
        <br v-else>
        <p v-if="err.includes(101)" style="color: #E22">{{$t('register.nameTaken')}}</p>
        <br v-else>
        <input type="password" id="passwd" name="passwd" v-model="passwd" required
          minlength="8" maxlength="127" autocomplete="new-password"
          :placeholder="$t('profile.password')" size="36">
        <br>
        <br>
        <input type="password" id="passwd2" name="passwd2" v-model="passwd2" required
          inlength="8" maxlength="127" autocomplete="new-password"
          :placeholder="$t('profile.confirmPassword')" size="36">
        <p v-if="err.includes(103)" style="color: #E22">{{$t('register.malPassword')}}</p>
        <br v-else>
        <p v-if="err.includes(110)" style="color: #E22">{{$t('register.passwordMissmatch')}}</p>
        <br v-else>
        <p v-if="err.includes(102)" style="color: #E22">{{$t('register.missingForms')}}</p>
        <br v-else>
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
      email: '',
      passwd: '',
      passwd2: '',
      english: true,
      err: []
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
    validate () {
      var usernameRegex = new RegExp('^[a-zA-Z0-9]{5,30}$')
      var realnameRegex = new RegExp('^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$')
      var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$')
      var emailRegex = new RegExp('^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$')

      this.err = []
      if (!emailRegex.test(this.email)) { this.err.push(104) }
      if (!usernameRegex.test(this.dispname)) { this.err.push(105) }
      if (!passwordRegex.test(this.passwd)) { this.err.push(103) }
      if (!realnameRegex.test(this.fname)) { this.err.push(107) }
      if (!realnameRegex.test(this.lname)) { this.err.push(106) }
      if (this.passwd !== this.passwd2) { this.err.push(110) }
    },
    submit () {
      this.validate()
      if (this.err.length !== 0) { return }
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
        .catch(error => {
          switch (error.response.status) {
            case 400:
            case 409:
              this.err.push(error.response.data.error.code)
              break
            case 500:
              // TODO redirect to err500 page
              this.$log.error(error)
              break
            default:
              this.$log.error(error)
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
    display: grid;
    grid-template-rows: 70px auto;
  }

  .loginBox {
    width: 400px;
    height: auto;
    margin: 20px auto auto auto;
  }
</style>
