<template>
  <!-- CMS stands for Content Management System -->
  <div
    class="cms"
  >
    <Header
      id="titlebar"
      title="Content Management System"
      :buttonsActive=false
    />
    <div
      class="inner-cms"
    >
      <!-- Display CMS menu -->
      <div
        class="cmsMenu bg-dark text-white"
      >
        <b-nav vertical>
          <b-nav-text>{{$t('cms.userMgmt')}}</b-nav-text>
          <b-nav-item active @click="changeContent('user list')">{{$t('cms.userList')}}</b-nav-item>
          <b-nav-item @click="changeContent('new user')">{{$t('cms.newUser')}}</b-nav-item>
          <b-nav-item @click="changeContent('permissions')">{{$t('cms.userRights')}}</b-nav-item>
        </b-nav>
        <hr>
        <b-nav vertical>
          <b-nav-text>{{$t('cms.contentMgmt')}}</b-nav-text>
          <b-nav-item @click="changeContent('notice boards')">{{$t('cms.editBoards')}}</b-nav-item> <!-- Manage notice boards and default board -->
        </b-nav>
        <hr>
        <b-nav vertical>
          <b-nav-text>{{$t('cms.groupMgmt')}}</b-nav-text>
          <b-nav-item @click="changeContent('groups')">{{$t('cms.editGroups')}}</b-nav-item>
        </b-nav>
      </div>

      <!-- Display CMS surface -->
      <div
        class="cmsContent" align="center"
      >
        <!-- Show user list if selected -->
        <div
          v-if="selected === 'user list'"
        >
          <UserList />
        </div>

        <!-- Show user creation if selected -->
        <div
          v-if="selected === 'new user'"
        >
          <AddUser />
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'permissions'"
        >
          <PermissionPanel />
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'notice boards'"
        >
          <!-- TODO -->
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'groups'"
        >
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
      selected: 'user list'
    }
  },
  created () {
    if (!window.localStorage.getItem('mnb_atok')) { window.location = '/login' }
  },
  methods: {
    changeContent (choice) {
      switch (choice) {
        case 'user list':
        case 'new user':
        case 'permissions':
        case 'notice boards':
        case 'groups':
          this.selected = choice
      }
    }
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
</style>
