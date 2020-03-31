<template>
  <div class="m">
    <div>
      <b-container fluid>
        <b-row>
          <b-col lg="6">
            <b-form-group class="mb-0">
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>

          <b-col sm="7" md="6">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
            ></b-pagination>
          </b-col>
        </b-row>

      <b-table
        class="table"
        dark
        striped
        hover
        small
        :items="members"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        @filtered="onFiltered"
        sort-by="id"
        >
        <template v-slot:cell(delete)="row">
          <b-button size="sm" @click="deleteUser(row.item.id)" class="mr-1">X</b-button>
        </template>
        <template v-slot:cell(image)="row">
          <!-- TODO remove random image -->
          <b-avatar :src="'https://placem.at/people?w=174&&random='+row.item.id"></b-avatar>
        </template>
        </b-table>
      </b-container>
    </div>
    <div id="alert">
      <br>
      <b-alert
        :show="delStatus === 200"
        variant="success"
        dismissible
      >
        <h>{{$t('ui.userAdded')}}</h>
      </b-alert>
      <b-alert
        :show="delStatus === 403"
        variant="danger"
        dismissible
      >
        <h>{{$t('cms.noSelfDelete')}}</h>
      </b-alert>
      <b-alert
        :show="delStatus === 400"
        variant="danger"
        dismissible
      >
        <h>{{$t('cms.unexpectedError')}}</h>
      </b-alert>
    </div>
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
      members: [],
      delStatus: 0,
      fields: [
        { key: 'image', label: '' },
        { key: 'id', label: 'ID', sortable: true },
        { key: 'createdAt',
          label: 'Created',
          sortable: true,
          formatter: (value, key, item) => { return value ? new Date(value).toGMTString() : ' ' }
        },
        /*
        { key: 'lastSeen',
          label: 'Last Seen',
          formatter: (value,key,item) => { return value ? new Date(value) : ' ' }
        },
        */
        { key: 'fullName', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'userName', label: 'Username', sortable: true },
        { key: 'delete', label: 'Delete' }
      ],
      totalRows: 6,
      currentPage: 1,
      perPage: 5,
      sortBy: '',
      filter: null,
      filterOn: ['fullName', 'userName', 'email']
    }
  },
  created () {
    this.loadUserData()
    this.totalRows = this.items.length
  },
  methods: {
    refreshToken: async function () {
      await axios
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
    deleteUser: async function (id) {
      this.delStatus = 0
      this.refreshToken()
      await axios
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
    loadUserData: async function () {
      this.refreshToken()
      await axios
        .get('http://localhost:1337/api/users/all?skipAvatar=true', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.members = response.data
          this.members.forEach((val) => {
            val.fullName = val.lastName + ', ' + val.firstName
          })
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }

  }
}
</script>
<style scoped>

</style>
