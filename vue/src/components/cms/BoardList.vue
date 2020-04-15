<!-- This panel shows a list of all notice boards. They can also be visited and deleted -->
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
            :items="boards"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
            @row-dblclicked="onDoubleClicked"
            sort-by="id"
            sort-icon-left
            sort-null-last
          >
            <template v-slot:cell(delete)="row">
              <b-button size="sm" @click="deleteBoard(row.item.id)" class="mr-1">X</b-button>
            </template>
          </b-table>
        </b-overlay>

      </b-container>
    </div>
    <div id="alert">
      <br>
      <b-alert
        :show="delStatus === 200"
        variant="success"
        dismissible
      >
        {{$t('boards.boardDeleted')}}
      </b-alert>
      <b-alert
        :show="delStatus === 400"
        variant="danger"
        dismissible
      >
        {{$t('cms.unexpectedError')}}
      </b-alert>
      <b-alert
        :show="delStatus === 409"
        variant="danger"
        dismissible
      >
        {{$t('cms.cannotDeleteDefaultBoard')}}
      </b-alert>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { i18n } from '@/main.js'

export default {
  name: 'BoardList',
  data () {
    return {
      boards: [],
      delStatus: 0,
      loading: false,
      fields: [
        { key: 'id', label: i18n.t('cms.tables.id'), sortable: true },
        { key: 'createdAt',
          label: i18n.t('cms.tables.boardCreatedAt'),
          sortable: true,
          formatter: (value, key, item) => { return value ? new Date(value).toDateString() : ' ' }
        },
        { key: 'boardName', label: i18n.t('cms.tables.name'), sortable: true },
        { key: 'boardType',
          label: i18n.t('cms.tables.access'),
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
          formatter: (value, key, item) => {
            switch (value) {
              case 0:
                return i18n.t('cms.tables.default')
              case 2:
                return i18n.t('cms.tables.public')
              case 1:
                return null
              default:
                return '--undef'
            }
          }
        },
        { key: 'delete', label: i18n.t('cms.delete') }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 12,
      sortBy: '',
      filter: null,
      filterOn: ['boardName', 'boardType']
    }
  },
  created  () {
    this.loadBoardData()
  },
  methods: {
    // Called to refresh the access token
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
    // Used to delete notice boards
    deleteBoard: async function (id) {
      this.delStatus = 0
      this.loading = true
      this.refreshToken()
      await axios
        .delete('http://localhost:1337/api/boards/' + id, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.delStatus = 200
          this.loadBoardData()
        })
        .catch(err => {
          switch (err.response.status) {
            case 409:
              this.delStatus = 409
              break
            case 400:
            case 401:
            case 500:
            default:
              this.delStatus = 400
              this.$log.error(err)
          }
        })
      this.loading = false
    },
    // This method loads all public and private notice boards
    loadBoardData: async function () {
      this.loading = true
      this.refreshToken()
      await axios
        .get('http://localhost:1337/api/boards/all', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.boards = []
          this.boards.push(response.data.default)
          this.boards = this.boards.concat(response.data.public)
          this.boards = this.boards.concat(response.data.boards)
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
      this.totalRows = this.boards.length
      this.loading = false
    },
    // Called when the table gets filtered
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    // Double click opens the selected notice board
    onDoubleClicked (item, index, event) {
      event.preventDefault()
      this.$router.push({
        name: 'Board',
        params: {
          boardId: item.id
        }
      })
    }
  }
}
</script>
