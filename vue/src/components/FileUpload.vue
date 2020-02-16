<template>
  <div class="fileUpload">
    <br><br><br><br><br><br> <!-- Should be deleted if design is fixed -->
    <h2>Upload your file:</h2>
    <input
      v-bind:value="fileTitel"
      v-on:input="fileTitel = $event.target.value"
    />
    <br><br>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      @remove="onRemove"
      width="300"
      height="300"
      margin="16"
      accept="application/pdf,
            application/msword,
            application/msexcel,
            application/mspowerpoint,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.openxmlformats-officedocument.presentationml.presentation"
      size="10"
      buttonClass="btn btn-info button"
      removeButtonClass="btn btn-danger button"
      :customStrings="{
          upload: '<p>Your device does not support file uploading.</p>', // HTML allowed
          drag: 'Drag an file or <br>click here to select a file', // HTML allowed
          tap: 'Tap here to select a photo <br>from your gallery', // HTML allowed
          change: 'Change file', // Text only
          remove: 'Remove file', // Text only
          select: 'Select a file', // Text only
          selected: '<p>File successfully selected!</p>', // HTML allowed
          fileSize: 'The file size exceeds the limit', // Text only
          fileType: 'Only PDF, DOC(X), XLS(X) and PPT(X) is supported!', // Text only
          aspect: '' // Text only
      }"
      :removable="true"
    >
    </picture-input>
    <button
      v-if="fileRef !== ''"
      class="btn btn-primary button"
      v-on:click="$emit('upload-file', fileTitel, fileRef)"
    >
    Post file
    </button>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'FileUpload',
  data () {
    return {
      fileRef: '',
      fileTitel: 'Your file title'
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (file) {
      console.log('New picture selected!')
      if (file) {
        this.fileRef = this.$refs.pictureInput.image
      } else {
        this.fileRef = ''
        console.log('FileReader API not supported: use the <form>!')
      }
    },
    onRemove () {
      this.imagfileRef = ''
    }
  }
}
</script>

<style>
  #fileUpload {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  }

  h1, h2 {
  font-weight: normal;
  }

  ul {
  list-style-type: none;
  padding: 0;
  }

  li {
  display: inline-block;
  margin: 0 10px;
  }

  a {
  color: #42b983;
  }
</style>
