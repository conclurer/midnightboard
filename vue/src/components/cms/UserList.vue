<template>
  <div
    class="user-list"
  >
    <div>
      <div v-if="delStatus===0"></div>
      <div v-else-if="delStatus===200"><h4 class="bg-success">{{$t('ui.userDeleted')}}</h4><br></div>
      <div v-else-if="delStatus===403"><h4 class="bg-danger">{{$t('cms.noSelfDelete')}}</h4><br></div>
      <div v-else><h4 class="bg-danger">{{$t('cms.unexpectedError')}}</h4><br></div>
    </div>

    <table
      border
    >
      <tr>
        <th>{{$t('userList.id')}}</th>
        <th>{{$t('userList.firstName')}}</th>
        <th>{{$t('userList.lastName')}}</th>
        <th>{{$t('userList.username')}}</th>
        <th>{{$t('userList.email')}}</th>
        <th>{{$t('userList.creationDate')}}</th>
        <th>{{$t('userList.lastSeen')}}</th>
        <th>{{$t('cms.delete')}}</th>
      </tr>
      <tr
        v-for="member in members"
        :key="member.id"
      >
        <td>{{member.id}}</td>
        <td>{{member.firstName}}</td>
        <td>{{member.lastName}}</td>
        <td>{{member.userName}}</td>
        <td>{{member.email}}</td>
        <td>{{member.createdAt}}</td>
        <td>{{member.lastSeen}}</td>
        <td><a @click="deleteUser(member.id)"><font-awesome-icon icon="times-circle" class="text-danger" /></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserList',
  components: {
  },
  data () {
    return {
      members: [],
      delStatus: 0
    }
  },
  created () {
    this.loadUserData()
  },
  methods: {
    refreshToken () {
      axios
        .post('http://localhost:1337/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
        })
        .then(response => {
          window.localStorage.setItem('mnb_atok', response.data.accessToken)
        })
        .catch(err => {
          this.$log.error(err.response.config.token)
          switch (err.response.status) {
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    deleteUser (id) {
      this.refreshToken()
      axios
        .delete('http://localhost:1337/api/users/' + id, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.delStatus = 200
          this.loadUserData()
        })
        .catch(err => {
          switch (err.response.status) {
            case 403:
              this.delStatus = err.response.status
              break
            case 400:
            case 401:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    loadUserData () {
      this.refreshToken()
      axios
        .get('http://localhost:1337/api/users/all?skipAvatar=true', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => { this.members = response.data.sort(compare) })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })

      function compare (a, b) {
        if (a.id < b.id) {
          return -1
        } else if (a.id > b.id) {
          return 1
        } else { return 0 }
      }
    }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 0px 20px;
  }
</style>