<template>
  <div class="cms">
    <Header
      id="titlebar"
      title="CMS"
      :profileActive="true"
    />
    <div class="cmsNav">
      <div class="bg-dark text-white">
        <b-nav vertical pills>
          <b-nav-text class="navHeader">{{$t('cms.userMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'userList'" @click="selectedPanel='userList'">{{$t('cms.userList')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'registration'" @click="selectedPanel='registration'">{{$t('cms.newUser')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'permissions'" @click="selectedPanel='permissions'">{{$t('cms.userRights')}}</b-nav-item>
        </b-nav>
        <hr>
        <b-nav vertical pills>
          <b-nav-text class="navHeader">{{$t('cms.contentMgmt')}}</b-nav-text>
          <b-nav-item :active="selectedPanel === 'noticeBoards'" @click="selectedPanel='noticeBoards'">{{$t('cms.boardList')}}</b-nav-item>
          <b-nav-item :active="selectedPanel === 'newBoard'" @click="selectedPanel='newBoard'">{{$t('cms.newBoard')}}</b-nav-item>
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
          <BoardList />
        </div>

        <div v-if="selectedPanel === 'newBoard'">
          <AddBoard />
        </div>

        <div v-if="selectedPanel === 'groups'">
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

  .cms {
    position: sticky;
    width: 100%;
    min-height: 100vh;
    max-height: 100%;
    display: grid;
    grid-template-rows: 72px 1fr;
  }

  .cmsNav {
    margin: 45px 0 0 0;
    display: grid;
    grid-template-columns: minmax(160px, 16vw) 1fr;
    min-width: 180px;
    min-height: calc(100vh - 54px);
    max-height: 100%;
  }

  .cmsContent {
    padding: 5vh 2vh 2vh 2vh;
  }

  .navHeader {
    font-size: 1.3em;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
