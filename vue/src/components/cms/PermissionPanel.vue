<template>
  <div
    class="permission-panel"
  >
    <table
      border
    >
      <tr>
        <th>{{$t('rights.userRights')}}</th>
      </tr>
      <tr>
        <td>
          <div class="wrapper">
            <div class="rights">
              <!-- User rights -->
              <form>
                <input type="checkbox" id="uCreate" name="uCreate" value="uCreate" v-model="userPermissions.createBoards">
                <label for="uCreate">{{$t('rights.createBoards')}}</label>
                <br>
                <input type="checkbox" id="uRegister" name="uRegister" value="uRegister" v-model="userPermissions.register">
                <label for="uRegister">{{$t('rights.register')}}</label>
                <br>
                <input type="checkbox" id="uLike" name="uLike" value="uLike" v-model="userPermissions.like">
                <label for="uLike">{{$t('rights.like')}}</label>
                <br>
                <input type="checkbox" id="uComment" name="uComment" value="uComment" v-model="userPermissions.comment">
                <label for="uComment">{{$t('rights.comment')}}</label>
              </form>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Submission button -->
    <br>
    <input type="button" :value="$t('ui.adopt')" @click="changePermissions">
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'

export default {
  name: 'PermissionPanel',
  components: {
  },
  data () {
    return {
      userPermissions: {
        createBoards: false,
        register: false,
        like: false,
        comment: false
      }
    }
  },
  methods: {
    changePermissions: async function () {
      // TODO: Save rights to database
      console.log(this.userPermissions)
    }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 0px 20px;
    vertical-align: top;
  }

  label {
    margin-left: 10px;
  }

  .wrapper {
    display: inline-block;
  }

  .rights {
    display: block;
    text-align: left;
  }
</style>
