<!-- The profile page shows all relevant user data. It can either be static or editable -->
<template>
  <div class="main">
    <Header
      id="titlebar"
      title="Profile"
      @profile-changed="$refs.profile.reload()"
      @profile-changed-to-edit="forceChangeToEdit"
      @profile-changed-to-view="forceChangeToView"
    />
    <b-card
      bg-variant="dark"
      class="user-card"
    >
      <Profile
        id="profile"
        :userId="$route.params.userId"
        :editable="editing"
        ref="profile"
      />
    </b-card>
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '@/components/Header.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'ProfilePage',
  components: {
    Header,
    Profile
  },
  props: ['editable'],
  data () {
    return {
      editing: false
    }
  },
  created () {
    this.editing = this.editable
  },
  methods: {
    // Allows the user to edit his properties
    forceChangeToEdit: function () {
      if (this.editing) { return }
      this.editing = true
      this.$refs.profile.reload()
    },
    // Change to static user data view
    forceChangeToView: function () {
      if (!this.editing) { return }
      this.editing = false
      this.$refs.profile.reload()
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 54px 0 0 0;
    height: 100vh;
  }

  .user-card {
    min-width: 400px;
    max-width: 40vw;
    margin: 20px auto auto auto;
    height: auto;
  }
</style>
