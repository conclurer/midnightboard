<!-- The Content Management System is used to configure the boards and users belonging to the system.
    Only admins (Super-Users) can access the CMS -->
<template>
  <div class="cms">
    <Header
      id="titlebar"
      :title="$t('cms.title')"
    />
    <div class="cms-nav bg-dark">
        <b-nav vertical pills>
          <b-nav-text class="nav-header">{{$t('cms.userMgmt')}}</b-nav-text>
          <b-nav-item :to="{ name: 'cms_users_list'}" :active="selectedPanel === 'userList'" @click="selectedPanel='userList'">{{$t('cms.userList')}}</b-nav-item>
          <b-nav-item :to="{ name: 'cms_users_add'}" :active="selectedPanel === 'registration'" @click="selectedPanel='registration'">{{$t('cms.newUser')}}</b-nav-item>
          <b-nav-item disabled :active="selectedPanel === 'permissions'" @click="selectedPanel='permissions'">{{$t('cms.userRights')}}</b-nav-item>
        <hr>
          <b-nav-text class="nav-header">{{$t('cms.contentMgmt')}}</b-nav-text>
          <b-nav-item :to="{ name: 'cms_boards_list'}" :active="selectedPanel === 'noticeBoards'" @click="selectedPanel='noticeBoards'">{{$t('cms.boardList')}}</b-nav-item>
          <b-nav-item :to="{ name: 'cms_boards_add'}" :active="selectedPanel === 'newBoard'" @click="selectedPanel='newBoard'">{{$t('cms.newBoard')}}</b-nav-item>
        <hr>
          <b-nav-text class="nav-header">{{$t('cms.groupMgmt')}}</b-nav-text>
          <b-nav-item disabled :active="selectedPanel === 'groups'" @click="selectedPanel='groups'">{{$t('cms.editGroups')}}</b-nav-item>
        </b-nav>
    </div>
    <div class="cms-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'CMS',
  components: {
    Header
  },
  data () {
    return {
      selectedPanel: ''
    }
  },
  created: function () {
    switch (this.$route.path) {
      case '/cms/users/list':
        this.selectedPanel = 'userList'
        break
      case '/cms/users/add':
        this.selectedPanel = 'registration'
        break
      case '/cms/boards/list':
        this.selectedPanel = 'noticeBoards'
        break
      case '/cms/boards/add':
        this.selectedPanel = 'newBoard'
        break
    }
  }
}
</script>

<style scoped>
  hr {
    height: 1px;
    border: none;
    background-color: lightgray;
  }

  .cms-nav {
    height: 100%;
    width: 240px;
    position: fixed;
    color: #EEE;
    overflow-x: hidden;
    padding: 20px 8px 0 8px;
  }

  .cms-content {
    margin-left: 240px;
    padding: 5vh 2vh 2vh 2vh;
  }

  .nav-header {
    font-size: 1.3em;
    font-weight: bold;
    text-decoration: underline;
  }

  .cms-content {
    padding: 5vh 2vh 2vh 2vh;
  }
</style>
