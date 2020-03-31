<template>
  <!-- CMS stands for Content Management System -->
  <div
    class="cms"
  >
    <Header
      id="titlebar"
      title="Content Management System"
      :buttonsActive="false"
    />
    <div
      class="inner-cms"
    >
      <!-- Display CMS menu -->
      <div class="cmsMenu bg-dark text-white">
        <b-nav vertical pills>
          <b-nav-text class="navHeader">{{$t('cms.userMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'userList'" @click="selectedPanel='userList'">{{$t('cms.userList')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'registration'" @click="selectedPanel='registration'">{{$t('cms.newUser')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'permissions'" @click="selectedPanel='permissions'">{{$t('cms.userRights')}}</b-nav-item>
        </b-nav>
        <hr>
        <b-nav vertical pills>
          <b-nav-text class="navHeader">{{$t('cms.contentMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'noticeBoards'" @click="selectedPanel='noticeBoards'">{{$t('cms.editBoards')}}</b-nav-item> <!-- Manage notice boards and default board -->
        </b-nav>
        <hr>
        <b-nav vertical pills>
          <b-nav-text class="navHeader">{{$t('cms.groupMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'groups'" @click="selectedPanel='groups'">{{$t('cms.editGroups')}}</b-nav-item>
        </b-nav>
      </div>

      <div class="cmsContent" align="center">

        <div v-if="selectedPanel === 'userList'">
          <UserList />
        </div>

        <div v-if="selectedPanel === 'registration'">
          <AddUser />
        </div>

        <div v-if="selectedPanel === 'permissions'">
          <PermissionPanel />
        </div>

        <div v-if="selectedPanel === 'noticeBoards'">
          <!-- TODO -->
        </div>


        <div v-if="selectedPanel === 'groups'">
          <!-- TODO -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import UserList from '@/components/cms/UserList.vue'
import AddUser from '@/components/cms/AddUser.vue'
import PermissionPanel from '@/components/cms/PermissionPanel.vue'

export default {
  name: 'CMS',
  components: {
    Header,
    UserList,
    PermissionPanel,
    AddUser
  },
  data () {
    return {
      selectedPanel: 'userList'
    }
  },
  created () {
    if (!window.localStorage.getItem('mnb_atok')) { window.location = '/login' }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  hr {
    height: 1px;
    border: none;
    background-color: var(--background-board);
  }

  .cms {
    position: sticky;
    width: 100%;
    min-height: 100vh;
    background: var(--background-board);
    display: grid;
    grid-template-rows: 72px 1fr;
  }

  .inner-cms {
    display: grid;
    grid-template-columns: 300px 1fr;
    height: 100%;
    width: 100%;
  }

  .cmsMenu {
    grid-column: 1 / 2;
    height: 100%;
    width: 300px;
    position: fixed;
    left: 0px;
    border-top: 1px solid var(--background-board);
  }

  .cmsContent {
    grid-column: 2 / 3;
    padding: 20px;
  }

  .navHeader {
    font-size: 1.3em;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
