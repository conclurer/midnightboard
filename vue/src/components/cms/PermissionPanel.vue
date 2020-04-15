<!-- This panel shows a list of user rights. They can be granted and deprived separately -->
<template>
  <div
    class="permission-panel"
  >
    <br>
    <b-card
      class="permissionBox"
      bg-variant="dark"
      text-variant="white"
    >
      <h2 v-html="$t('rights.userRights')"></h2>
      <br>
      <b-form @submit="changePermissions">
        <div align="left">
          <b-form-checkbox
            id="createBoards"
            name="createBoards"
            v-model="userPermissions.createBoards"
          >
            {{$t('rights.createBoards')}}
          </b-form-checkbox>
          <br>

          <b-form-checkbox
            id="register"
            name="register"
            v-model="userPermissions.register"
          >
            {{$t('rights.register')}}
          </b-form-checkbox>
          <br>

          <b-form-checkbox
            id="like"
            name="like"
            v-model="userPermissions.like"
          >
            {{$t('rights.like')}}
          </b-form-checkbox>
          <br>

          <b-form-checkbox
            id="comment"
            name="comment"
            v-model="userPermissions.comment"
          >
            {{$t('rights.comment')}}
          </b-form-checkbox>
          <br>
        </div>

        <div align="center">
          <b-button-group>
            <b-button type="submit" variant="primary" >{{$t('ui.adopt')}}</b-button>
          </b-button-group>
        </div>
      </b-form>
    </b-card>
    <br>
  </div>
</template>

<script>
export default {
  name: 'PermissionPanel',
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
    // This method updates the database with the selected user rights
    changePermissions: async function (event) {
      event.preventDefault()

      // TODO: Save rights to database
    }
  }
}
</script>

<style scoped>
  .permissionBox {
    width: 25vw;
    min-width: 300px;
    margin: 0px auto;
  }
</style>
