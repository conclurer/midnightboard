<template>
  <div
    class="user-list"
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
      ],
      english: true,
      selected: 'user list'
    }
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
  table {
    width: 100%;
  }

  th, td {
    text-align: center;
    padding: 0px 20px;
  }
</style>
