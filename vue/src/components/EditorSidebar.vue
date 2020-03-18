<template>
  <div class="editorSidebar">
    <NoteEditor @create-note="createNote"/>
    <hr />
    <ImageUpload @upload-image="uploadImage"/>
    <hr />
    <FileUpload @upload-file="uploadFile"/>
    <br><br><br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import axios from 'axios'
import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import NoteEditor from '@/components/NoteEditor.vue'

export default {
  components: {
    NoteEditor,
    ImageUpload,
    FileUpload
  },
  data () {
    return {
      boardId: 1
    }
  },
  methods: {
    createNote: async function (titleContent, jsonContent) {
      const jsonBody = JSON.stringify({
        title: titleContent,
        typeOfPost: 'application/note',
        content: jsonContent
      })

      // Post request to api
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
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
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
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
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
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
