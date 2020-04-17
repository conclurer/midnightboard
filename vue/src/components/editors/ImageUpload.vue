<!-- This editor is used to to upload image files -->
<template>
  <div class="imageUpload">
    <b-form-input
      class="imageTitle"
      v-model="imageTitle"
      :maxlength="maxImageTitleLength"
      :placeholder="$t('editor.image.title')"
      :state="titleState"
    />
    <b-form-invalid-feedback>
      {{$t('editor.tooShort')}}
    </b-form-invalid-feedback>
    <br>
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
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  components: {
    PictureInput
  },
  data () {
    return {
      imageRef: '',
      imageTitle: '',
      maxImageTitleLength: 50
    }
  },
  // Computed value shows whether the title string is valid
  computed: {
    titleState () {
      return this.imageTitle.length > 1
    }
  },
  methods: {
    // Called when a user changes the selected image
    onChange: function (image) {
      if (image) {
        this.image = image
        this.imageRef = this.$refs.pictureInput.image
      } else {
        this.imageRef = ''
      }
    },
    // Called when a user removes the selected image
    onRemove: function () {
      this.imageRef = ''
      this.imageTitle = this.$t('editor.image.title')
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
