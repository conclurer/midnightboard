<template>
  <div class="m">
    <b-container fluid class="profile-container">
      <b-row>
        <b-col sm="2" class="c-Avatar">
          <b-avatar src="https://placekitten.com/300/300" size="18vh" class="m-2"></b-avatar>
        </b-col>
        <b-col sm="10" align-self="start">
          <b-row align-v="center" class="r-RName">
            {{userData.firstName + ' ' + userData.lastName}}
          </b-row>
          <b-row class="r-UName">
            {{userData.userName}}
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="b">
          B-L_
        </b-col>
        <b-col class="b">
          B-R_
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileComp',
  props: ['userId'],
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

  .r-RName{
    font-size: 4vh;
    padding-left: 4vh;
    padding-top: 4.5vh;
    font-family: "Roboto";
    font-weight: bold;
  }

  .r-UName{
    font-size: 2vh;
    padding-left: 6vh;
    font-family: "Roboto";
    font-weight: bold;
  }
  
  .m .b .c-Avatar .r-RName .r-UName {
    border: 1px dotted red
  }
</style>
