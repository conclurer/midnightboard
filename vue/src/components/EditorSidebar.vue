<template>
  <div v-bar> <!-- el1 -->
    <div> <!-- el2 -->
      <!-- your scrollable content -->
      <div class="editorSidebar">
        <div class="upperGap" />
          <NoteEditor @create-note="createNote"/>
      </div>
      <ImageUpload @upload-image="uploadImage"/>
      <FileUpload @upload-file="uploadFile"/>
      <!-- dragger will be automatically added here -->
    </div>
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
        type: 'note',
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
    uploadImage: async function (titleContent, jsonContent) {
      const jsonBody = JSON.stringify({
        title: titleContent,
        type: 'note',
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
    uploadFile: async function (titleContent, jsonContent) {
      const jsonBody = JSON.stringify({
        title: titleContent,
        type: 'note',
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
    }
  }
}
</script>

<style scoped>
  .upperGap {
    position: relative;
    top: 0px;
    left: 0px;
    height: 100px;
    width: 100%;
  }

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
