<template>
  <div class="register">
    <Header
      id="titlebar"
      :title="$t('ui.register')"
      :buttonsActive="false"
    />

    <b-card
      class="loginBox"
      align="center"
      bg-variant="dark"
      text-variant="white"
    >
      <br>
      <h4 v-html="$t('ui.createAccount')"></h4>
      <br>

      <div>
        <b-overlay
          :show="loading"
          variant="light"
          opacity="0.6"
          blur="2px"
          rounded="sm"
        >
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-input
              id="fname"
              v-model="fname"
              :state="fnameState"
              :placeholder="$t('profile.firstName')"
              trim
            ></b-form-input>
            <b-tooltip target="fname" variant="info" triggers="hover" :show.sync="fnameState">
               {{$t('register.malFirstName')}}
            </b-tooltip>
            <br>

            <b-form-input
              id="lname"
              v-model="lname"
              :state="lnameState"
              :placeholder="$t('profile.lastName')"
              trim
            ></b-form-input>
            <b-tooltip target="lname" variant="info" triggers="hover">
               {{$t('register.malLastName')}}
            </b-tooltip>
            <br>

            <b-form-input
              id="uname"
              v-model="uname"
              :state="unameState"
              :placeholder="$t('profile.username')"
              trim
            ></b-form-input>
            <b-tooltip target="uname" variant="info" triggers="hover">
               {{$t('register.malUsername')}}
            </b-tooltip>
            <br>

            <b-form-input
              id="email"
              v-model="email"
              :state="emailState"
              :placeholder="$t('profile.email')"
              trim
            ></b-form-input>
            <b-tooltip target="email" variant="info" triggers="hover">
               {{$t('register.malEmail')}}
            </b-tooltip>
            <br>

            <b-form-input
              id="passwd"
              v-model="passwd"
              :state="passwdState"
              :placeholder="$t('profile.password')"
              type="password"
              trim
            ></b-form-input>
            <b-tooltip target="passwd" variant="info" triggers="hover">
               {{$t('register.malPassword')}}
            </b-tooltip>

            <br>
            <b-button-group>
              <b-button type="submit" variant="primary" :disabled="!finalState">{{$t('ui.submit')}}</b-button>
              <b-button type="reset" variant="danger">{{$t('ui.reset')}}</b-button>
            </b-button-group>
            <br>

          </b-form>
        </b-overlay>
      </div>

      <br>
      <router-link to="/login">
        {{$t('ui.toLogin')}}
      </router-link>
    </b-card>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
  name: 'Register',
  components: {
    Header
  },
  data () {
    return {
      loading: false,
      uname: '',
      email: '',
      passwd: '',
      fname: '',
      lname: ''
    }
  },
  computed: {
    fnameState () {
      return /^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$/.test(this.fname)
    },
    lnameState () {
      return /^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$/.test(this.lname)
    },
    emailState () {
      return /^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$/.test(this.email)
    },
    unameState () {
      return /^[a-zA-Z0-9]{5,30}$/.test(this.uname)
    },
    passwdState () {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$/.test(this.passwd)
    },
    finalState () {
      return (this.passwdState && this.unameState && this.emailState && this.lnameState && this.fnameState)
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      if (!this.finalState) { return }
      this.loading = true

      this.refreshToken()
      axios
        .post('http://localhost:1337/api/users/register',
          {
            'userName': this.uname,
            'email': this.email,
            'password': this.passwd,
            'firstName': this.fname,
            'lastName': this.lname
          },
          {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          this.direktLogin()
        })
        .catch(err => {
          switch (err.response.status) {
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
      this.loading = false
    },
    onReset (event) {
      event.preventDefault()
      this.uname = ''
      this.email = ''
      this.passwd = ''
      this.fname = ''
      this.lname = ''
    },
    refreshToken () {
      axios
        .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
        })
        .then(response => {
          window.localStorage.setItem('mnb_atok', response.data.accessToken)
        })
        .catch(err => {
          switch (err.response.status) {
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    direktLogin () {
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
          switch (err.response.status) {
            case 400:
            case 403:
              break
            case 500:
            default:
              this.$log.error(err)
          }
        })
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
