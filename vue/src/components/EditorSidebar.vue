<template>
  <div class="editorSidebar">
    <NoteEditor @create-note="createNote"/>
    <hr />
    <ImageUpload @upload-image="uploadImage"/>
    <hr />
    <FileUpload @upload-file="uploadFile"/>
    <hr />
    <PollEditor @create-poll="createPoll"/>
    <hr />
    <SurveyEditor @create-survey="createSurvey"/>
    <br><br><br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import axios from 'axios'
import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import NoteEditor from '@/components/NoteEditor.vue'
import PollEditor from '@/components/PollEditor.vue'
import SurveyEditor from '@/components/SurveyEditor.vue'

export default {
  components: {
    NoteEditor,
    ImageUpload,
    FileUpload,
    PollEditor,
    SurveyEditor
  },
  data () {
    return {
      boardId: 1
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
    createPoll: async function (titleContent, jsonContent, answerIndices) {
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
            answerIds: answerIndices
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
