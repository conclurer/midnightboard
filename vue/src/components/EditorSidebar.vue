<template>
  <div class="editorSidebar">
    <NoteEditor @create-note="createNote"/>
    <ImageUpload @upload-image="uploadImage"/>
    <FileUpload @upload-file="uploadFile"/>
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
      console.log(jsonBody)

      // Post request to api
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => console.log(err))

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
      console.log(jsonBody)

      // Post request to api
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => console.log(err))

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
      console.log(jsonBody)

      // Post request to api
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId, jsonBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then(res => {})
        .catch(err => console.log(err))

      // Notify notice board
      this.$emit('add-note')
    }
  }
}
</script>
