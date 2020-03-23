<template>
  <div
    class="add-user"
  >
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
          <div align="left">
            <table>
              <tr>
                <td>{{$t('profile.role')}}:</td>
                <td>
                  <input type="radio" class="radio-button" id="user" name="role" value="user">
                  <label for="user">{{$t('profile.user')}}</label>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="radio" class="radio-button" id="admin" name="role" value="admin">
                  <label for="admin">{{$t('profile.admin')}}</label>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <br><br>
      <input type="submit" :value="$t('profile.affiliate')">
      <br><br>
      </form>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'

export default {
  name: 'AddUser',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    addUser () {
      // TODO
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
