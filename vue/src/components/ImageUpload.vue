<template>
  <div class="imageUpload">
    <br>
    <h2>{{$t('editor.image.title')}}</h2>
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
          upload: '<p>' + $t('editor.image.upload') + '</p>', // HTML allowed
          drag: $t('editor.image.drag'), // HTML allowed
          tap: $t('editor.image.tap'), // HTML allowed
          change: $t('editor.image.change'), // Text only
          remove: $t('editor.image.remove'), // Text only
          select: $t('editor.image.select'), // Text only
          selected: '<p>' + $t('editor.image.selected') + '</p>', // HTML allowed
          fileSize: $t('editor.image.fileSize'), // Text only
          fileType: $t('editor.image.fileType'), // Text only
          aspect: $t('editor.image.aspect') // Text only
      }"
      :removable="true"
    >
    </picture-input>
    <button
      v-if="imageRef !== ''"
      class="btn btn-primary button"
      v-on:click="$emit('upload-image', imageTitel, imageRef)"
    >
    {{$t('editor.image.post')}}
    </button>
    <br><br><br><br> <!-- For scrollbar -->
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  data () {
    return {
      imageRef: '',
      imageTitel: 'Your image title' // i18n?
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
