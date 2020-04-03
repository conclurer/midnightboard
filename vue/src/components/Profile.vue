<template>
  <div class="m">
    <b-container fluid class="profile-container">
      <b-row>
        <b-avatar :src="'https://placem.at/people?w=512&random='+userId" size="12rem"></b-avatar>
      </b-row>
      <b-row>
        <h3>John Doe</h3>
      </b-row>
      <b-row>
        <h5>JohnDoe1337</h5>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileComp',
  props: ['userId', 'editable'],
  data () {
    return {
      userData: { }
    }
  },
  created () {
    this.refreshToken()
    this.fetchProfile()
  },
  methods: {
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
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    fetchProfile () {
      var fetchLink = 'http://localhost:1337/api/users/'
      if (!this.userId) { fetchLink += 'me' } else { fetchLink += this.userId }

      axios
        .get(fetchLink, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.userData = response.data
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  .m {

  }

  .c-Avatar{

  }

</style>
