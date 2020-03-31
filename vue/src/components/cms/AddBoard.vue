<template>
  <div
    class="add-board"
  >
    <br>
    <b-card
      class="creationBox"
      align="center"
      bg-variant="dark"
      text-variant="white"
      required
    >
      <br>
      <h2 v-html="$t('ui.addBoard')"></h2>
      <br>
      <div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-input
            id="bname"
            v-model="bname"
            :state="bnameState"
            :placeholder="$t('boards.boardName')"
            trim
          ></b-form-input>
          <b-tooltip target="bname" variant="info" triggers="hover">
             {{$t('boards.malBoardName')}}
          </b-tooltip>
          <br>

          <br>
          <b-button-group>
            <b-button type="submit" variant="primary" :disabled="!bnameState">{{$t('ui.submit')}}</b-button>
            <b-button type="reset" variant="danger">{{$t('ui.reset')}}</b-button>
          </b-button-group>
          <br>
        </b-form>
      </div>
    </b-card>

    <div id="alert">
      <br>
      <b-alert
        :show="addStatus === 201"
        variant="success"
        dismissible
      >
        <h5>{{$t('boards.boardAdded')}}</h5>
      </b-alert>
      <b-alert
        :show="addStatus === 400"
        variant="danger"
        dismissible
      >
        <h5>{{$t('cms.unexpectedError')}}</h5>
      </b-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddBoard',
  computed: {
    bnameState () {
      return /^[a-zA-Z0-9äÄöÖüÜß \'\-\.\,\/\&]{2,50}$/.test(this.bname)
    }
  },
  data () {
    return {
      addStatus: 0,
      bname: ''
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      if (!this.bnameState) { return }
      this.addStatus = 0

      this.refreshToken()
      axios
        .post('http://localhost:1337/api/boards',
          {
            'boardName': this.bname
          },
          {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          this.addStatus = 201
          this.bname = ''
        })
        .catch(err => {
          this.addStatus = err.response.status
          switch (err.response.status) {
            case 400:
            case 401:
            case 500:
            default:
              this.addStatus = 400
              this.$log.error(err)
          }
        })
    },
    onReset (event) {
      event.preventDefault()
      this.addStatus = 0
      this.bname = ''
    },
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
              this.$log.error(err)
              break
            default:
              this.$log.error(err)
          }
        })
    }
  }
}
</script>

<style scoped>
  td {
    text-align: left;
  }

  .creationBox {
    width: 22vw;
    min-width: 300px;
    margin: 0px auto;
  }

  .radio-button {
    margin-left: 10px;
  }
</style>
