<!-- The profile page shows all important user data. When the editing variable is set, users also can modify their properties -->
<template>
  <b-overlay
    :show="loading"
    :variant="loadingStateColor"
    opacity="0.8"
    blur="2px"
    rounded="sm"
  >
    <template v-slot:overlay>
      <b-spinner v-if="loadingState !== 'error'" class="mb-2"></b-spinner>
      <p class="statusMessage" v-if="loadingState === 'update'"> {{$t('profile.statusMsg.updatingUsername')}} </p>
      <p class="statusMessage" v-else-if="loadingState === 'mail'"> {{$t('profile.statusMsg.updatingEmail')}} </p>
      <p class="statusMessage" v-else-if="loadingState === 'passwd'"> {{$t('profile.statusMsg.updatingPassword')}} </p>
      <p class="statusMessage" v-else-if="loadingState === 'success'"> {{$t('profile.statusMsg.profileUpdated')}} </p>

      <div v-else-if="loadingState === 'error'">
        <p class="statusMessage" v-if="errorCode === 'duplicateUsername'"> {{$t('profile.statusMsg.usernameTaken')}} </p>
        <p class="statusMessage" v-else-if="errorCode === 'duplicateEmail'"> {{$t('profile.statusMsg.emailTaken')}} </p>
        <p class="statusMessage" v-else-if="errorCode === 'similarPasswd'"> {{$t('profile.statusMsg.passwordTooSimilar')}} </p>
        <p class="statusMessage" v-else-if="errorCode === 'invalidPasswd'"> {{$t('profile.statusMsg.incorrectPassword')}} </p>
        <p class="statusMessage" v-else> {{$t('profile.statusMsg.unexpectedError')}} </p>
        <b-button @click="errOkClick" variant="info" >{{$t('ui.ok')}}</b-button>
      </div>
    </template>

    <div class="m">
      <div class="avatarPanel">
        <b-avatar :text="avatarText" variant="info" button @click="avatarClick" size="15vh" class="p-0"></b-avatar>
        <div class="pt-2">
          <p class="aTextFName">{{userData.firstName + ' ' + userData.lastName}}</p>
          <p class="aTextUName" v-if="!editing">{{userData.userName}}</p>
        </div>
        <hr>
      </div>

      <div v-if="editing" class="editDiv">
        <b-input-group class="pt-3">
          <b-input-group-prepend>
            <b-input-group-text class="editPrepend">{{$t('profile.username')}}</b-input-group-text>
          </b-input-group-prepend>

          <b-form-input
            :state="unameState"
            v-model="pUname"
            :value="pUname"
            :disabled="!unameToggle"
            trim
          />

          <b-input-group-append>
            <b-button :pressed.sync="unameToggle" variant="info" class="editAppend">
              <font-awesome-icon v-if="!unameToggle" icon="unlock" flip="horizontal"/>
              <font-awesome-icon v-else icon="lock-open" />
            </b-button>
          </b-input-group-append>

        </b-input-group>

        <b-input-group class="pt-3">
        <b-input-group-prepend>
          <b-input-group-text class="editPrepend">{{$t('profile.email')}}</b-input-group-text>
        </b-input-group-prepend>

        <b-form-input
          :state="emailState"
          v-model="pMail"
          :value="pMail"
          :disabled="!emailToggle"
          trim
          autocomplete="email"
        />

        <b-input-group-append>
          <b-button :pressed.sync="emailToggle" variant="info" class="editAppend">
            <font-awesome-icon v-if="!emailToggle" icon="unlock" flip="horizontal"/>
            <font-awesome-icon v-else icon="lock-open" />
          </b-button>
        </b-input-group-append>

        </b-input-group>

        <b-input-group class="pt-3">

              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text class="editPrependPass">{{$t('profile.passwordOld')}}</b-input-group-text>
                </b-input-group-prepend>
                <b-input
                  :state="passwdOldState"
                  v-model="pPasswdOld"
                  type="password"
                  :disabled="!passwdToggle" trim
                  autocomplete="current-password"
                />

                <b-input-group-append>
                  <b-button :pressed.sync="passwdToggle" variant="info" class="editAppend">
                    <font-awesome-icon v-if="!passwdToggle" icon="unlock" flip="horizontal"/>
                    <font-awesome-icon v-else icon="lock-open" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text class="editPrependPass">{{$t('profile.passwordNew')}}</b-input-group-text>
                </b-input-group-prepend>
                <b-input
                  :state="passwdState"
                  v-model="pPasswdNew"
                  type="password"
                  :disabled="!passwdToggle"
                  trim
                  autocomplete="new-password"
                />

                <b-input-group-append>
                  <b-button :pressed.sync="passwdToggle" variant="info" class="editAppend"/>
                </b-input-group-append>
              </b-input-group>

        </b-input-group>

        <b-button-group class="mt-3">
        <b-button :disabled="!submitState" @click="onSubmit" variant="primary" >{{$t('ui.apply')}}</b-button>
        <b-button @click="onCancel" variant="danger">{{$t('ui.cancel')}}</b-button>
        </b-button-group>
      </div>

      <div v-else class="viewDiv">
        <div class="pl-2">
          <p class="viewTextLabel">{{$t('profile.email')}}</p>
          <p class="viewText">{{this.userData.email}}</p>
        </div>
        <!--<b-button v-if="editable" @click="editClick" variant="primary" >{{$t('ui.edit')}}</b-button>-->
      </div>
    </div>

  </b-overlay>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfileComp',
  props: ['userId', 'editable'],
  computed: {
    emailState () {
      return this.emailToggle ? this.emailRegex : null
    },
    unameState () {
      return this.unameToggle ? this.unameRegex : null
    },
    passwdState () {
      return this.passwdToggle ? this.passwdRegex : null
    },
    passwdOldState () {
      return this.passwdState && (this.pPasswdOld.length < 3) ? false : null
    },
    emailRegex () {
      return /^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$/.test(this.pMail)
    },
    unameRegex () {
      return /^[a-zA-Z0-9]{5,30}$/.test(this.pUname)
    },
    passwdRegex () {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[\-=._#§@$!%*?&])[A-Za-z0-9\-=._#§@$!%*?&]{8,}$/.test(this.pPasswdNew)
    },
    // Returns whether the complete user data is valid
    submitState () {
      if (this.userData.email !== this.pMail && !this.emailRegex) { return false }
      if (this.userData.userName !== this.pUname && !this.unameRegex) { return false }
      if (this.pPasswdNew !== '' && !this.passwdRegex) { return false }
      if (this.pPasswdNew.length !== 0 && this.pPasswdOld.length < 3) { return false }
      return true
    },
    loadingStateColor () {
      switch (this.loadingState) {
        case 'error':
          return 'danger'
        case 'success':
          return 'success'
        default:
          return 'light'
      }
    }
  },
  data () {
    return {
      userData: { },
      loading: false,
      loadingState: null,
      errorCode: '',
      editing: false,
      pMail: '',
      pPasswdOld: '',
      pPasswdNew: '',
      pUname: '',
      emailToggle: false,
      unameToggle: false,
      passwdToggle: false,
      avatarText: ''
    }
  },
  created: async function () {
    this.reload()
  },
  methods: {
    // Used to change the user data as specified in the text fields
    onSubmit: async function (event) {
      event.preventDefault()
      this.loading = true
      if (this.userData.userName !== this.pUname) {
        this.loadingState = 'update'
        await axios // Update
          .put('http://localhost:1337/api/users/' + this.userData.id,
            {
              'userName': this.pUname
            },
            {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            })
          .then(response => {

          })
          .catch(err => {
            this.loadingState = 'error'
            switch (err.response.status) {
              case 409:
                this.errorCode = 'duplicateUsername'
                break
              case 400:
              case 401:
              case 403:
              case 404:
              case 500:
              default:
                this.errorCode = 'unknown'
            }
          })
        if (this.errorCode !== '') {
          this.pUname = this.userData.userName
          return
        }
      }

      if (this.userData.email !== this.pMail) {
        this.loadingState = 'email'
        await axios // Email
          .put('http://localhost:1337/api/users/' + this.userData.id + '/updateemail',
            {
              'email': this.pMail
            },
            {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            })
          .then(response => {

          })
          .catch(err => {
            this.loadingState = 'error'
            switch (err.response.status) {
              case 409:
                this.errorCode = 'duplicateEmail'
                break
              case 400:
              case 401:
              case 500:
              default:
                this.errorCode = 'unknown'
            }
          })
        if (this.errorCode !== '') {
          this.pMail = this.userData.email
          return
        }
      }

      if (this.pPasswdNew.length > 3 && this.pPasswdOld.length > 3) {
        this.loadingState = 'passwd'
        await axios // Password
          .put('http://localhost:1337/api/users/' + this.userData.id + '/updatepassword',
            {
              'oldPassword': this.pPasswdOld,
              'newPassword': this.pPasswdNew
            },
            {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            })
          .then(response => {

          })
          .catch(err => {
            this.loadingState = 'error'
            switch (err.response.status) {
              case 409:
                this.errorCode = 'similarPasswd'
                break
              case 403:
                this.errorCode = 'invalidPasswd'
                break
              case 400:
              case 401:
              case 500:
              default:
                this.errorCode = 'unknown'
            }
          })
        if (this.errorCode !== '') {
          this.pPasswdOld = this.pPasswdNew = ''
          return
        }
      }
      this.loadingState = 'success'
      this.fetchProfile()
      this.loading = false
      this.onCancel()
    },
    // This method is used to leave the editing mode
    onCancel () {
      this.loadingState = null
      this.pMail = this.userData.email
      this.pUname = this.userData.userName
      this.emailToggle = this.unameToggle = this.passwdToggle = false
      this.pPasswdOld = this.pPasswdNew = ''
      this.editing = this.loading = false
      this.errorCode = ''
    },
    // Used to upload an avatar image. Not yet implemented
    avatarClick () {
      // TODO Upload Avatar
    },
    // Brings the user into the editing mode
    editClick () {
      if (this.editable) { this.editing = true }
    },
    // Called when a user clicks OK at the error dialog
    errOkClick () {
      this.errorCode = ''
      this.loading = false
      this.loadingState = null
    },
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
          switch (err.response.status) {
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    },
    // This method is used to load all relevant user data from the database
    fetchProfile: async function () {
      var fetchLink = 'http://localhost:1337/api/users/'
      if (!this.userId) { fetchLink += 'me' } else { fetchLink += this.userId }

      await axios
        .get(fetchLink, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          this.userData = response.data
          this.pMail = response.data.email
          this.pUname = response.data.userName
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 500:
            case 400:
            default:
              this.$log.error(err)
          }
        })
    },
    // Used to reload the profile page
    reload: async function () {
      this.loading = true
      await this.refreshToken()
      await this.fetchProfile()
      this.editing = this.editable
      this.avatarText = this.userData.firstName.charAt(0) + this.userData.lastName.charAt(0)
      this.loading = false
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  hr {
    border-top: solid 1px white;
  }
  .aTextFName {
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 2.6em;
  }
  .aTextUName {
    margin-top: -1.3em;
    font-size: 1.4em;
    color: lightgray;
    text-align: center;
  }
  .viewTextLabel {
    padding-left: 0rem;
    margin-bottom: -0.3em;
    font-size: 1em;
    color: lightgray;
    text-align: left;
  }
  .viewText {
    padding-left: 1rem;
    font-size: 1.2em;
    color: white;
    text-align: left;
  }
  .editDiv {
    padding: 1vh;
  }
  .editPrepend {
    font-size: 0.9em;
    width:100px;
  }
  .editPrependPass {
    font-size: 0.7em;
    width:100px;
  }
  .editAppend {
    width: 40px;
  }
  .statusMessage {
    font-size: 1.4em;
    color: lightgray;
    text-align: center;
  }
</style>
