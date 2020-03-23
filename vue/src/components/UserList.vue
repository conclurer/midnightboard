<template>
  <div
    class="user-list"
  >
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
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'UserList',
  components: {
  },
  data () {
    return {
      members: []
    }
  },
  created () {
    axios
      .get('http://localhost:1337/api/users/all?skipAvatar=true', {
        headers: {
          'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNTg0OTc1MzYxLCJleHAiOjE2MTY1MTEzNjF9.ZS_N0zQ2lxKVlMIrkOMoWhbp1ujZSPrIiqNLH2NdUyo'
        }
      })
      .then(response => { this.members = response.data.sort(compare) })
      .catch(err => {
        switch (err.response.status) {
          case 400:
            window.location = '/login'
            break
          case 401:
            break
          case 500:
            this.$log.error(err)
            break
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
