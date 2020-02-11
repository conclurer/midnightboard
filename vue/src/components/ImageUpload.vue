<template>
  <div class="imageUpload">
    <h2>Upload your image:</h2>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      width="300"
      height="300"
      margin="16"
      accept="image/jpeg,image/png"
      size="10"
      buttonClass="btn"
      :customStrings="{
          upload: '<p>Your device does not support file uploading.</p>', // HTML allowed
          drag: 'Drag an image or <br>click here to select a file', // HTML allowed
          tap: 'Tap here to select a photo <br>from your gallery', // HTML allowed
          change: 'Change Photo', // Text only
          remove: 'Remove Photo', // Text only
          select: 'Select a Photo', // Text only
          selected: '<p>Photo successfully selected!</p>', // HTML allowed
          fileSize: 'The file size exceeds the limit', // Text only
          fileType: 'Only JPEG and PNG is supported!', // Text only
          aspect: 'Landscape/Portrait' // Text only
     }">
    </picture-input>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  data () {
    return {
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>!')
      }
    }
  }
}
</script>

<style>
    #imageUpload {
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
