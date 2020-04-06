<template>
  <div class="editorSidebar">
    <EditorHeader
      @close="close"
      @update-date="updateDate"
      :editorTitle="editorType"
    />
    <hr>
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
    <div v-else-if="editorId === 4">
      <SurveyEditor @create-survey="createSurvey"/>
    </div>
    <br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import axios from 'axios'
import EditorHeader from '@/components/editors/EditorHeader'
import FileUpload from '@/components/editors/FileUpload.vue'
import ImageUpload from '@/components/editors/ImageUpload.vue'
import NoteEditor from '@/components/editors/NoteEditor.vue'
import PollEditor from '@/components/editors/PollEditor.vue'
import SurveyEditor from '@/components/editors/SurveyEditor.vue'

export default {
  components: {
    EditorHeader,
    NoteEditor,
    ImageUpload,
    FileUpload,
    PollEditor,
    SurveyEditor
  },
  data () {
    return {
      dueDate: null
    }
  },
  props: ['boardId', 'editorId'],
  computed: {
    editorType () {
      switch (this.editorId) {
        case 0:
          return this.$t('editor.note.heading')
        case 1:
          return this.$t('editor.image.heading')
        case 2:
          return this.$t('editor.file.heading')
        case 3:
          return this.$t('editor.poll.heading')
        case 4:
          return this.$t('editor.survey.heading')
        default:
          return ''
      }
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
    createPoll: async function (titleContent, jsonContent, answerIndices, answerNames) {
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
            answerIds: answerIndices,
            answers: answerNames
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
    },
    createSurvey: async function (titleContent, jsonContent, questionIndices, questions, mcqAnswers) {
      const jsonBodyNote = JSON.stringify({
        title: titleContent,
        typeOfPost: 'application/survey',
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
          const jsonBodySurvey = JSON.stringify({
            postId: postResponse.data.id,
            questionIds: questionIndices,
            questions: questions,
            answers: mcqAnswers
          })
          await axios
            .post('http://localhost:1337/api/surveys', jsonBodySurvey, {
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
                'Content-Type': 'application/json'
              }
            }
            )
            .then(surveyResponse => {})
            .catch(err => this.$log.error(err))
        })
        .catch(err => this.$log.error(err))

      // Notify notice board
      this.$emit('add-note')
    },
     // Used to update the date property
    updateDate: function (date) {
      this.dueDate = (new Date(date)).getTime()
    },
    // Used to close the editor sidebar
    close: function () {
      this.$emit('close')
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
</style>
