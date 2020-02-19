<template>
  <div v-bar> <!-- el1 -->
    <div> <!-- el2 -->
      <!-- your scrollable content -->
      <div class="editorSidebar">
          <NoteEditor @create-note="createNote"/>
      </div>
      <!-- Need working scrollbar! -->
      <ImageUpload @upload-image="uploadImage"/>
      <!--
      <FileUpload @upload-file="uploadFile"/>
      -->
      <!-- dragger will be automatically added here -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import NoteEditor from '@/components/NoteEditor.vue'

export default {
  components: {
    NoteEditor,
    ImageUpload
    // FileUpload
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
        .post('http://localhost:1337/api/boards/' + this.boardId + '/new', jsonBody, {
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
        .post('http://localhost:1337/api/boards/' + this.boardId + '/new', jsonBody, {
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
        .post('http://localhost:1337/api/boards/' + this.boardId + '/new', jsonBody, {
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

<style scoped>
  .vb >>> .vb-dragger {
    position: relative;
    z-index: 5;
    width: 12px;
    right: 0;
  }

  .vb >>> .vb-dragger >>> .vb-dragger-styler {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transform: rotate3d(0,0,0,0);
      transform: rotate3d(0,0,0,0);
      -webkit-transition:
          background-color 100ms ease-out,
          margin 100ms ease-out,
          height 100ms ease-out;
      transition:
          background-color 100ms ease-out,
          margin 100ms ease-out,
          height 100ms ease-out;
      background-color: rgba(48, 121, 244,.1);
      margin: 5px 5px 5px 0;
      border-radius: 20px;
      height: calc(100% - 10px);
      display: block;
  }

  .vb.vb-scrolling-phantom >>> .vb-dragger >>> .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.3);
  }

  .vb >>> .vb-dragger:hover >>> .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
      margin: 0px;
      height: 100%;
  }

  .vb.vb-dragging >>> .vb-dragger >>> .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
      margin: 0px;
      height: 100%;
  }

  .vb.vb-dragging-phantom >>> .vb-dragger >>> .vb-dragger-styler {
      background-color: rgba(48, 121, 244,.5);
  }
</style>
