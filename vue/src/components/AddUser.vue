<template>
  <div
    class="add-user"
  >
    <div v-if="success" class="bg-success">
      {{$t('ui.userAdded')}}
    </div>
    <br v-if="success">
    <b-card
      class="creationBox"
      align="center"
      bg-variant="dark"
      text-variant="white"
    >
    <br>
    <form>
      <h2 v-html="$t('profile.addUser')"></h2>
      <br>
      <div class="wrapper">
        <div class="user-values">
          <input type="text" class="text-field" id="fname" name="fname" :placeholder="$t('profile.firstName')" size="36">
          <br><br>
          <input type="text" class="text-field" id="lname" name="lname" :placeholder="$t('profile.lastName')" size="36">
          <br><br>
          <input type="text" class="text-field" id="uname" name="uname" :placeholder="$t('profile.username')" size="36">
          <br><br>
          <input type="text" class="text-field" id="email" name="email" :placeholder="$t('profile.email')" size="36">
          <br><br>
          <input type="password" class="text-field" id="password" name="password" :placeholder="$t('profile.password')" size="36">
          <br><br>
        </div>
      </div>
      <br><br>
      <input type="button" :value="$t('profile.affiliate')" @click="addUser">
      <br><br>
      </form>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'AddUser',
  components: {
  },
  data () {
    return {
      success: false
    }
  },
  methods: {
    addUser () {
      var userName = document.getElementById('uname').value
      var email = document.getElementById('email').value
      var password = document.getElementById('password').value
      var firstName = document.getElementById('fname').value
      var lastName = document.getElementById('lname').value

      // Check if values are valid
      var userNameRegex = new RegExp('^[a-zA-Z0-9]{5,30}$')
      var emailRegex = new RegExp('^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$')
      var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$')
      var realNameRegex = new RegExp('^[\'\-\. a-zA-ZŠŽšžŸÀ-ÖÙ-öù-ÿ]{2,20}$')

      if (userName.match(userNameRegex) && email.match(emailRegex) && password.match(passwordRegex) && firstName.match(realNameRegex) && lastName.match(realNameRegex)) {
        var userData = {
          'userName': userName,
          'email': email,
          'password': password,
          'firstName': firstName,
          'lastName': lastName
        }
        var jsonData = JSON.stringify(userData)
        console.log(jsonData)

        // Database request
        axios
          .post('http://localhost:1337/api/users/register', jsonData, {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
              'Content-Type': 'application/json'
            }
          })
          .then(response => { this.success = true })
          .catch(err => {
            switch (err.response.status) {
            case 400:
            case 401:
              window.location = '/login'
              break
            case 500:
            default:
              this.$log.error(err)
            }
          })

        // Reset form values
        document.getElementById('uname').value = ''
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('fname').value = ''
        document.getElementById('lname').value = ''
      }
    }
  }
}
</script>

<style scoped>
  td {
    text-align: left;
  }

  label {
    margin-left: 5px;
  }

  .creationBox {
    width: 400px;
    margin: 0px auto;
  }

  .radio-button {
    margin-left: 10px;
  }

  .wrapper {
    display: inline-block;
  }

  .user-values {
    display: block;
    text-align: left;
  }
</style>
