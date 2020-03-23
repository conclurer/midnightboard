<template>
  <div
    class="user-list"
  >
    <table
      border
    >
      <tr>
        <th>{{$t('userList.id')}}</th>
        <th>{{$t('userList.creationDate')}}</th>
        <th>{{$t('userList.lastUpdated')}}</th>
        <th>{{$t('userList.lastSeen')}}</th>
        <th>{{$t('userList.username')}}</th>
        <th>{{$t('userList.firstName')}}</th>
        <th>{{$t('userList.lastName')}}</th>
        <th>{{$t('userList.email')}}</th>
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
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'

export default {
  name: 'UserList',
  components: {
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
      ]
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
