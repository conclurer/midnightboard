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
      <input type="text" id="fname" name="fname" :placeholder="$t('profile.firstName')" size="36">
      <br><br>
      <input type="text" id="lname" name="lname" :placeholder="$t('profile.lastName')" size="36">
      <br><br>
      <input type="text" id="uname" name="uname" :placeholder="$t('profile.username')" size="36">
      <br><br>
      <input type="text" id="email" name="email" :placeholder="$t('profile.email')" size="36">
      <br><br>
      <div align="left">
        <table>
          <tr>
            <td>Role:</td>
            <td>
              <input type="radio" id="user" name="role" value="user">
              <label for="user">User</label>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="radio" id="admin" name="role" value="admin">
              <label for="admin">Admin</label>
            </td>
          </tr>
        </table>
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
  table {
    margin-left: 35px;
  }

  td {
    text-align: left;
  }

  .creationBox {
    width: 400px;
    margin: 0px auto;
  }
</style>
