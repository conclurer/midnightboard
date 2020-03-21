<template>
  <!-- CMS stands for Content Management System -->
  <div
    class="cms"
  >
    <Header
      id="titlebar"
      title="Content Managament System"
      @change-language="changeLanguage"
      :english="english"
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
          <table
            border
          >
            <tr>
              <th>Member ID</th>
              <th>Creation date</th>
              <th>Last updated</th>
              <th>Last seen</th>
              <th>Username</th>
              <th>First name</th>
              <th>Last name</th>
              <th>E-mail</th>
            </tr>
            <tr
              v-for="member in members"
              :key="member.id"
            >
              <td>{{member.id}}</td>
              <td>{{member.createdAt}}</td>
              <td>{{member.updatedAt}}</td>
              <td>{{member.lastSeen}}</td>
              <td>{{member.username}}</td>
              <td>{{member.firstName}}</td>
              <td>{{member.lastName}}</td>
              <td>{{member.email}}</td>
            </tr>
          </table>
        </div>

        <!-- Show user creation if selected -->
        <div
          v-if="selected === 'new user'"
        >
          <b-card
            class="creationBox"
            align="center"
            bg-variant="dark"
            text-variant="white"
          >
            <br>
            <form>
              <h2 v-html="$t('profile.addUser')"></h2>
              <br>
              <input type="text" id="fname" name="fname" :placeholder="$t('profile.firstName')" size="36">
              <br><br>
              <input type="text" id="lname" name="lname" :placeholder="$t('profile.lastName')" size="36">
              <br><br>
              <input type="text" id="uname" name="uname" :placeholder="$t('profile.username')" size="36">
              <br><br>
              <input type="text" id="email" name="email" :placeholder="$t('profile.email')" size="36">
              <br><br>
              <input type="submit" :value="$t('profile.affiliate')">
              <br><br>
            </form>
          </b-card>
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'permissions'"
        >
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'notice boards'"
        >
        </div>

        <!-- Show permission configuration if selected -->
        <div
          v-if="selected === 'groups'"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import Header from '@/components/Header.vue'
import { i18n } from '@/main.js'

export default {
  name: 'CMS',
  components: {
    Header
  },
  data () {
    return {
      members: [
        {
          id: 0,
          createdAt: 0,
          updatedAt: 0,
          lastSeen: 0,
          username: 'Sillian',
          firstName: 'Simon',
          lastName: 'Deuring',
          email: 'simon@gmail.de'
        },
        {
          id: 1,
          createdAt: 0,
          updatedAt: 0,
          lastSeen: 0,
          username: 'Sillian',
          firstName: 'Simon',
          lastName: 'Deuring',
          email: 'simon@gmail.de'
        }
      ],
      english: true,
      selected: 'user list'
    }
  },
  created () {
    switch (i18n.locale.substring(0, 2)) {
      case 'en':
        this.english = true
        break
      case 'de':
        this.english = false
        break
      default:
        this.english = true
    }

    // Set default view
  },
  methods: {
    changeLanguage () {
      this.english = !this.english
      if (this.english) {
        i18n.locale = 'en-GB'
      } else {
        i18n.locale = 'de-DE'
      }
      // TODO: Change user settings
      // User system does not exist yet.
    },
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
  table {
    width: 100%;
  }

  hr {
    height: 1px;
    border: none;
    background-color: var(--background-board);
  }

  th, td {
    text-align: center;
    padding: 0px 20px;
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

  .creationBox {
    width: 400px;
    margin: 20px auto;
  }
</style>
