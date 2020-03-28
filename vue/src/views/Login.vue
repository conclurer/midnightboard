<template>
  <div
    class="login"
  >
    <Header
      id="titlebar"
      title="Login"
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
        <p v-if="inval" style="color: #E22">{{$t('login.invalidLogin')}}</p>
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

export default {
  name: 'NoticeBoard',
  components: {
    Header
  },
  data () {
    return {
      email: '',
      passwd: '',
      inval: false
    }
  },
  methods: {
    submit () {
      this.inval = false
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
              this.inval = true
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

  .login {
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
    margin: 20px auto auto auto;
  }
</style>
