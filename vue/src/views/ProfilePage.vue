<template>
  <div class = "m">
    <div class="p">
      <Header
        id="titlebar"
        title="Login"
        :profileActive="true"
      />
      <b-card>
        <Profile
          id="profile"
          userId="2"
        />
      </b-card>
    </div>
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
  .m {
    background: var(--background-board);
  }
  .p {
    position: relative;
    display: grid;
    grid-template-rows: 70px 1fr;
    background: var(--background-board);
  }
</style>
