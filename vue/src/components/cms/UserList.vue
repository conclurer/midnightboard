<template>
  <div class="m">
      <div id="userTable">
        <b-container fluid>
          <b-row>
            <b-col lg="6">
              <b-form-group class="mb-0">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    :placeholder="$t('cms.tables.search')"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">{{$t('ui.clear')}}</b-button>
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
          <b-overlay
            :show="loading"
            variant="light"
            opacity="0.6"
            blur="2px"
            rounded="sm"
          >
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
              @row-dblclicked="onDoubleClicked"
              @row-contextmenu="onRightClicked"
              sort-by="id"
              >
              <template v-slot:cell(delete)="row">
                <b-button size="sm" @click="deleteUser(row.item.id)" class="mr-1">X</b-button>
              </template>
              <template v-slot:cell(image)="row">
                <b-avatar :text="row.value" variant="info"></b-avatar>
              </template>

            </b-table>
          </b-overlay>
        </b-container>
      </div>
      <div id="alertBox">
        <br>
        <b-alert
          :show="delStatus === 200"
          variant="success"
          dismissible
        >
          <h>{{$t('cms.userDeleted')}}</h>
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

      <div id="cm-div">
          <ul v-on:blur="clickOutside()" ref="cm" id="context-menu" tabindex="-1" v-if="viewContextMenu" v-bind:style="{ top:top, left:left }">
            <p>{{selectedUser}}</p>
            <li @click="clickProfile">{{$t('ui.profile')}}</li>
            <li @click="clickEdit">{{$t('ui.edit')}}</li>
            <li @click="clickDelete">{{$t('cms.delete')}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { i18n } from '@/main.js'

export default {
  name: 'UserList',
  components: {

  },
  data () {
    return {
      members: [],
      delStatus: 0,
      loading: false,
      fields: [
        { key: 'image',
          label: '',
          formatter: (value, key, item) => { return item.firstName.charAt(0) + item.lastName.charAt(0) }
        },
        { key: 'id', label: i18n.t('cms.tables.id'), sortable: true },
        { key: 'createdAt',
          label: i18n.t('cms.tables.userCreatedAt'),
          sortable: true,
          formatter: (value, key, item) => { return value ? new Date(value).toDateString() : ' ' }
        },
        /*
        { key: 'lastSeen',
          label: i18n.t('cms.tables.lastSeen'),
          formatter: (value,key,item) => { return value ? new Date(value).toDateString() : ' ' }
        },
        */
        { key: 'fullName',
          label: i18n.t('cms.tables.name'),
          sortable: true,
          formatter: (value, key, item) => { return item.lastName + ', ' + item.firstName }
        },
        { key: 'email', label: i18n.t('cms.tables.email'), sortable: true },
        { key: 'userName', label: i18n.t('cms.tables.username'), sortable: true }
        // { key: 'delete', label: i18n.t('cms.delete') }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 12,
      sortBy: '',
      filter: null,
      filterOn: ['fullName', 'userName', 'email'],

      viewContextMenu: false,
      top: '0px',
      left: '0px',
      selectedId: null,
      selectedUser: null
    }
  },
  created () {
    this.loadUserData()
    this.totalRows = this.members.length
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
      this.loading = true
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
      this.loading = false
    },
    loadUserData: async function () {
      this.loading = true
      this.refreshToken()
      await axios
        .get('http://localhost:1337/api/users/all?skipAvatar=true', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.members = response.data
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
      this.loading = false
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    onDoubleClicked (item, index, event) {
      event.preventDefault()
      this.$router.push({
        name: 'Profile',
        params: {
          userId: item.id,
          editable: false
        }
      })
    },
    onRightClicked (item, index, event) {
      event.preventDefault()
      var top = event.pageY
      var left = event.pageX

      this.top = top + 'px'
      this.left = left + 'px'

      this.selectedId = item.id
      this.selectedUser = item.firstName + ' ' + item.lastName
      this.viewContextMenu = true
      this.$nextTick(() => this.$refs.cm.focus())
    },
    clickOutside () {
      this.viewContextMenu = false
    },
    clickEdit () {
      this.viewContextMenu = false
      this.$router.push({
        name: 'Profile',
        params: {
          userId: this.selectedId,
          editable: true
        }
      })
    },
    clickDelete () {
      this.viewContextMenu = false
      this.deleteUser(this.selectedId)
    },
    clickProfile () {
      this.viewContextMenu = false
      this.$router.push({
        name: 'Profile',
        params: {
          userId: this.selectedId,
          editable: false
        }
      })
    }
  }
}
</script>
<style scoped>
  #context-menu {
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    min-width: 160px;
    max-width: 400px;
    z-index: 999999;
  }
  #context-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 35px;
  }
  #context-menu li:last-child {
      border-bottom: none;
  }
  #context-menu li:hover {
      background: #1E88E5;
      color: #FAFAFA;
  }
  p {
    color: darkgray;
  }
</style>
