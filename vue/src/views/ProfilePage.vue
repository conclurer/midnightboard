<template>
  <div class="main">
    <Header
      id="titlebar"
      title="Profile"
      :profileActive="true"
    />

    <b-card
      bg-variant="dark"
      class="userCard"
    >
      <Profile
        id="profile"
        :userId="$route.params.userId"
        :editable="editable"
      />
    </b-card>
  </div>
</template>

<script>
// import axios from 'axios'
import Header from '@/components/Header.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'Profilepage',
  components: {
    Header,
    Profile
  },
  props: ['editable'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .main {
    padding: 54px 0 0 0;
    height: 100vh;
  }
  .userCard {
    min-width: 400px;
    max-width: 40vw;
    margin: 20px auto auto auto;
    height: auto;
  }
</style>
