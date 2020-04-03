<template>
  <div class="main">
    <Header
      id="titlebar"
      title="12345678901234567890"
      :profileActive="true"
    />

    <b-card
      bg-variant="dark"
      class="userCard"
    >
      <Profile
        id="profile"
        userId="2"
        editable="true"
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
    background: var(--background-board);
  }
  #p {
    background: var(--background-board);
  }

  .userCard {
    min-width: 400px;
    max-width: 40vw;
    margin: 20px auto auto auto;
    height: auto;

    border: dotted 2px red;
  }
</style>
