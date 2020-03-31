<template>
  <div
    class="board-list"
  >
    <div>
      <div v-if="delStatus===0"></div>
      <div v-else-if="delStatus===200"><h4 class="bg-success">{{$t('boards.boardDeleted')}}</h4><br></div>
      <div v-else><h4 class="bg-danger">{{$t('cms.unexpectedError')}}</h4><br></div>
    </div>

    <table
      border
    >
      <tr>
        <th>{{$t('boards.id')}}</th>
        <th>{{$t('boards.boardName')}}</th>
        <th>{{$t('boards.creatorID')}}</th>
        <th>{{$t('boards.creatorName')}}</th>
        <th>{{$t('boards.creationDate')}}</th>
        <th>{{$t('cms.delete')}}</th>
      </tr>
      <tr
        v-for="board in boards"
        :key="board.id"
      >
        <td>{{board.id}}</td>
        <td>{{board.boardName}}</td>
        <td>{{board.creatorId}}</td>
        <td :key="computed" v-html="creatorNames[board.id]"></td>
        <td>{{board.createdAt}}</td>
        <td><a @click="deleteBoard(board.id)"><font-awesome-icon icon="times-circle" class="text-danger" /></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoardList',
  components: {
  },
  data () {
    return {
      boards: [],
      creatorNames: [],
      computed: false,
      delStatus: 0
    }
  },
  created () {
    this.loadBoards()
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
    // Method used to delete boards from the database
    deleteBoard (id) {
      this.refreshToken()
      axios
        .delete('http://localhost:1337/api/boards/' + id, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.delStatus = 200
          this.loadBoards()
        })
        .catch(err => {
          this.$log.error(err)
        })
    },
    // Method used to load boards from the database
    loadBoards () {
      this.refreshToken()
      axios
        .get('http://localhost:1337/api/boards/all', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => { this.boards = response.data.sort(compare); this.getCreatorNames(response.data.sort(compare)) })
        .catch(err => {
          switch (err.response.status) {
            case 400:
            case 401:
            case 404:
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
    },
    // Method used to get names of board creators
    async getCreatorNames (members) {
      this.refreshToken()

      // Initialize array
      this.creatorNames = new Array(members[members.length - 1].id + 1)

      // Fill array with names
      for (var i = 0; i < members.length; i++) {
        await axios
          .get('http://localhost:1337/api/users/' + members[i].creatorId + '?skipAvatar=true', {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
            }
          })
          .then(response => { this.creatorNames[members[i].id] = (response.data.firstName + ' ' + response.data.lastName) })
          .catch(err => {
            switch (err.response.status) {
              case 404:
                this.creatorNames[members[i].id] = this.$t('boards.notFound')
                break
              case 400:
              case 500:
              default:
                this.$log.error(err)
            }
          })
      }

      this.computed = true
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
