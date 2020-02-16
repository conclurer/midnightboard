<template>
  <div class="imageUpload">
    <br><br><br><br><br><br> <!-- Should be deleted if design is fixed -->
    <h2>Upload your image:</h2>
    <input
      v-bind:value="imageTitel"
      v-on:input="imageTitel = $event.target.value"
    />
    <br><br>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      @remove="onRemove"
      width="300"
      height="300"
      margin="16"
      accept="image/jpeg,image/png"
      size="10"
      buttonClass="btn btn-info button"
      removeButtonClass="btn btn-danger button"
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
      }"
      :removable="true"
    >
    </picture-input>
    <button
      v-if="imageRef !== ''"
      class="btn btn-primary button"
      v-on:click="$emit('upload-image', imageTitel, imageRef)"
    >
    Post image
    </button>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  data () {
    return {
      imageRef: '',
      imageTitel: 'Your image title'
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        this.image = image
        this.imageRef = this.$refs.pictureInput.image
      } else {
        this.imageRef = ''
        console.log('FileReader API not supported: use the <form>!')
      }
    },
    onRemove () {
      this.imageRef = ''
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
