<!-- The Content Management System is used to configure the boards and users belonging to the system.
     Only admins (Super-Users) can access the CMS -->
<template>
  <div class="cms">
    <Header
      id="titlebar"
      :title="$t('cms.title')"
    />
    <!-- Displays the navigation bar on the left -->
    <div class="cms-nav">
      <div class="bg-dark text-white">
        <br>
        <b-nav vertical pills>
          <b-nav-text class="nav-header">{{$t('cms.userMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'userList'" @click="selectedPanel='userList'">{{$t('cms.userList')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'registration'" @click="selectedPanel='registration'">{{$t('cms.newUser')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'permissions'" @click="selectedPanel='permissions'">{{$t('cms.userRights')}}</b-nav-item>
        </b-nav>
        <hr>
        <b-nav vertical pills>
          <b-nav-text class="nav-header">{{$t('cms.contentMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'noticeBoards'" @click="selectedPanel='noticeBoards'">{{$t('cms.boardList')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'newBoard'" @click="selectedPanel='newBoard'">{{$t('cms.newBoard')}}</b-nav-item>
        </b-nav>
        <hr>
        <b-nav vertical pills>
          <b-nav-text class="nav-header">{{$t('cms.groupMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'groups'" @click="selectedPanel='groups'">{{$t('cms.editGroups')}}</b-nav-item>
        </b-nav>
      </div>

      <div class="cms-content" align="center">
        <!-- Displays a list of all registered users -->
        <div v-if="selectedPanel === 'userList'">
          <UserList />
        </div>
        <!-- Displays a form to register new users -->
        <div v-else-if="selectedPanel === 'registration'">
          <AddUser />
        </div>
        <!-- Displays a panel to adapt user rights -->
        <div v-else-if="selectedPanel === 'permissions'">
          <PermissionPanel />
        </div>
        <!-- Displays a list of all notice boards -->
        <div v-else-if="selectedPanel === 'noticeBoards'">
          <BoardList />
        </div>
        <!-- Displays a form to create new notice boards -->
        <div v-else-if="selectedPanel === 'newBoard'">
          <AddBoard />
        </div>
        <!-- Displays a panel to manage user groups. This panel is not yet implemented -->
        <div v-else-if="selectedPanel === 'groups'">
          <!-- TODO -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import UserList from '@/components/cms/UserList.vue'
import AddUser from '@/components/cms/AddUser.vue'
import PermissionPanel from '@/components/cms/PermissionPanel.vue'
import BoardList from '@/components/cms/BoardList.vue'
import AddBoard from '@/components/cms/AddBoard.vue'

export default {
  name: 'CMS',
  components: {
    Header,
    UserList,
    AddUser,
    PermissionPanel,
    BoardList,
    AddBoard
  },
  data () {
    return {
      selectedPanel: 'userList'
    }
  },
  created () {
    // Users with no access token are forwarded
    if (!window.localStorage.getItem('mnb_atok')) { this.$router.push({ name: 'Home' }) }
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
    display: grid;
    grid-template-columns: minmax(160px, 16vw) 1fr;
    min-width: 180px;
    min-height: calc(98vh - 28px);
    max-height: 100%;
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
