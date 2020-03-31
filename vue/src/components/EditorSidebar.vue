<template>
  <div class="editorSidebar">
    <div v-if="editorId === 0">
      <NoteEditor @create-note="createNote"/>
    </div>
    <div v-else-if="editorId === 1">
      <ImageUpload @upload-image="uploadImage"/>
    </div>
    <div v-else-if="editorId === 2">
      <FileUpload @upload-file="uploadFile"/>
    </div>
    <div v-else-if="editorId === 3">
      <PollEditor @create-poll="createPoll"/>
    </div>
    <hr />
    <VueCtkDateTimePicker
      id="DatePicker"
      class="datePicker"
      format="DD-MM-YYYY"
      formatted="ll"
      onlyDate v-model="date"
      color="#F9A618"
      :label="$t('editor.datePicker.dueDate')"
      :buttonNowTranslation="$t('editor.datePicker.currentDate')"
      :locale="$t('editor.datePicker.language')"
    >
    </VueCtkDateTimePicker>
    <br><br><br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import axios from 'axios'
import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import PollEditor from '@/components/PollEditor.vue'

export default {
  components: {
    NoteEditor,
    ImageUpload,
    FileUpload,
    PollEditor
  },
  props: ['editorId'],
  data () {
    return {
      date: null,
      boardId: null
    }
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
              this.$log.error(err)
              break
            default:
              this.$log.error(err)
          }
        })
    },
    createNote: async function (titleContent, jsonContent) {
      const jsonBody = JSON.stringify({
        title: titleContent,
        typeOfPost: 'application/note',
        content: jsonContent
      })

      // Post request to api
      this.refreshToken()
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => this.$log.error(err))

      // Notify notice board
      this.$emit('add-note')
    },
    uploadImage: async function (titleContent, dataURI) {
      const dataURISplit = dataURI.split(',')
      const datapart = dataURISplit[0] // E.g. data:image/png;base64
      const base64Data = dataURISplit[1] // BORw0KGgoAAAANSUhEUgAAB...
      const dataType = datapart.split(':')[1].split(';')[0] // Extract MIME type -> image/png
      const jsonBody = JSON.stringify({
        title: titleContent,
        typeOfPost: dataType,
        content: base64Data
      })

      // Post request to api
      this.refreshToken()
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => this.$log.error(err))

      // Notify board component
      this.$emit('add-note')
    },
    uploadFile: async function (titleContent, dataURI) {
      const dataURISplit = dataURI.split(',')
      const datapart = dataURISplit[0] // e.g. data:application/pdf;base64
      const base64Data = dataURISplit[1] // ZGgoAAAANSUhEUgAASs54B...
      const dataType = datapart.split(':')[1].split(';')[0] // Extract MIME type -> application/pdf
      const jsonBody = JSON.stringify({
        title: titleContent,
        typeOfPost: dataType,
        content: base64Data
      })

      // Post request to api
      this.refreshToken()
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => this.$log.error(err))

      // Notify notice board
      this.$emit('add-note')
    },
    createPoll: async function (titleContent, jsonContent, answerIndexes) {
      const jsonBodyNote = JSON.stringify({
        title: titleContent,
        typeOfPost: 'application/poll',
        content: jsonContent
      })

      // Post request to api
      this.refreshToken()
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBodyNote, {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
        )
        .then(async postResponse => {
          const jsonBodyPoll = JSON.stringify({
            postId: postResponse.data.id,
            answerIds: answerIndexes
          })
          await axios
            .post('http://localhost:1337/api/polls', jsonBodyPoll, {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            }
            )
            .then(pollResponse => {})
            .catch(err => this.$log.error(err))
        })
        .catch(err => this.$log.error(err))

      // Notify notice board
      this.$emit('add-note')
    }
  }
}
</script>

<style scoped>
  hr {
    height: 1px;
    border: none;
    background-color: #aaa;
  }

  .datePicker {
    width: 300px;
    z-index: 10003;
  }
</style>
