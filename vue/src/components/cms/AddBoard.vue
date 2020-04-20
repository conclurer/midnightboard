<!-- This panel allows admins to create new notice boards -->
<template>
  <div
    class="add-board"
  >
    <br>
    <b-card
      class="creation-box"
      align="center"
      bg-variant="dark"
      text-variant="white"
      required
    >
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

          <b-form-group>
            <font-awesome-icon icon="question-circle" id="tooltip-icon"/>
            <b-form-radio-group buttons button-variant="outline-info" v-model="selected" class="radio-group">
              <b-form-radio v-model="selected" value="1">Private</b-form-radio>
              <b-form-radio v-model="selected" value="2">Public</b-form-radio>
              <b-form-radio v-model="selected" value="0">Default</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-tooltip target="tooltipIcon" variant="info" triggers="hover" placement="topright" html="true">
            {{$t('boards.accessInfo')}}
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
import { axios } from '@/mixins/axios.js'

export default {
  name: 'AddBoard',
  mixins: [axios],
  data () {
    return {
      addStatus: 0,
      bname: '',
      selected: 1
    }
  },
  // Computed value shows whether the entered board name is valid
  computed: {
    bnameState () {
      return /^[a-zA-Z0-9äÄöÖüÜß \'\-\.\,\/\&]{2,50}$/.test(this.bname)
    }
  },
  methods: {
    // This method sends the board name to the backend to create a new notice board
    onSubmit (event) {
      event.preventDefault()
      if (!this.bnameState) { return }
      this.addStatus = 0
      this.axiosPOST('api/boards',
        {
          'boardName': this.bname,
          'boardType': this.selected
        },
        true, true)
        .then(response => {
          this.addStatus = 201
          this.bname = ''
        })
        .catch(err => {
          this.addStatus = err.response.status
          switch (err.response.status) {
            case 409:
              this.addStatus = 409
              break
            case 400:
            case 401:
            case 500:
            default:
              this.addStatus = 400
              this.$log.error(err)
          }
        })
    },
    // Used to reset the board name field
    onReset (event) {
      event.preventDefault()
      this.addStatus = 0
      this.bname = ''
    }
  }
}
</script>

<style scoped>
  td {
    text-align: left;
  }

  .creation-box {
    width: 450px;
    margin: 0px auto;
  }

  .radio-group {
    padding-left: 16px;
  }

  #tooltip-icon {
    cursor: help;
    font-size: 20pt;
    margin-left: -36px;
    margin-bottom: -6px;
  }
</style>
