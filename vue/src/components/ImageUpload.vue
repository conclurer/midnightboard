<template>
  <div class="imageUpload">
    <br>
    <h2>{{$t('editor.image.title')}}</h2>
    <b-form-input
      class="imageTitle"
      v-bind:value="imageTitle"
      v-on:input="imageTitle = $event"
      :maxlength="maxImageTitleLength"
    />
    <br><br>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      @remove="onRemove"
      width="300"
      height="300"
      margin="16"
      accept="image/jpeg,
            image/png"
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
      v-on:click="$emit('upload-image', imageTitle, imageRef)"
    >
      {{$t('editor.image.post')}}
    </button>
    <br>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  data () {
    return {
      imageRef: '',
      imageTitle: 'Your image title', // i18n?
      maxImageTitleLength: 50
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      if (image) {
        this.image = image
        this.imageRef = this.$refs.pictureInput.image
      } else {
        this.imageRef = ''
      }
    },
    onRemove () {
      this.imageRef = ''
    }
  }
}
</script>

<style scoped>
  .imageTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
