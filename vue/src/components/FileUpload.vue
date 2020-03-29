<template>
  <div class="fileUpload">
    <br>
    <h2>{{$t('editor.file.heading')}}</h2>
    <b-form-input
      class="fileTitle"
      v-bind:value="fileTitle"
      v-on:input="fileTitle = $event"
      :maxlength="maxFileTitleLength"
    />
    <br><br>
    <div v-if="pdfSelected">
      <font-awesome-icon icon="file-pdf" size="10x"/>
    </div>
    <div v-else-if="wordSelected">
      <font-awesome-icon icon="file-word" size="10x"/>
    </div>
    <div v-else-if="excelSelected">
      <font-awesome-icon icon="file-excel" size="10x"/>
    </div>
    <div v-else-if="powerpointSelected">
      <font-awesome-icon icon="file-powerpoint" size="10x"/>
    </div>
    <picture-input
      ref="pictureInput"
      @change="onChange"
      @remove="onRemove"
      width="300"
      height="300"
      margin="16"
      accept="application/pdf,
            application/msword,
            application/vnd.ms-excel,
            application/vnd.ms-powerpoint,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
            application/vnd.openxmlformats-officedocument.presentationml.presentation"
      size="10"
      buttonClass="btn btn-info button"
      removeButtonClass="btn btn-danger button"
      :customStrings="{
          upload: '<p>' + $t('editor.file.upload') + '</p>', // HTML allowed
          drag: $t('editor.file.drag'), // HTML allowed
          tap: $t('editor.file.tap'), // HTML allowed
          change: $t('editor.file.change'), // Text only
          remove: $t('editor.file.remove'), // Text only
          select: $t('editor.file.select'), // Text only
          selected: '<p>' + $t('editor.file.selected') + '</p>', // HTML allowed
          fileSize: $t('editor.file.fileSize'), // Text only
          fileType: $t('editor.file.fileType'), // Text only
          aspect: '' // Text only
      }"
      :removable="true"
    >
    </picture-input>
    <button
      v-if="fileRef !== ''"
      class="btn btn-primary button"
      v-on:click="$emit('upload-file', fileTitle, fileRef)"
    >
    {{$t('editor.file.post')}}
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
      fileTitle: this.$t('editor.file.title'),
      maxFileTitleLength: 50,
      pdfSelected: false,
      wordSelected: false,
      excelSelected: false,
      powerpointSelected: false
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (file) {
      this.pdfSelected = false
      this.wordSelected = false
      this.excelSelected = false
      this.powerpointSelected = false
      if (file) {
        // Hide image preview
        document.getElementsByClassName('preview-container')[0].style.display = 'none'
        const fileType = file.split(';')[0].split(':')[1]
        if (fileType === 'application/pdf') {
          this.pdfSelected = true
        } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          this.wordSelected = true
        } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.excelSelected = true
        } else { // application/vnd.ms-powerpoint || application/vnd.openxmlformats-officedocument.presentationml.presentation
          this.powerpointSelected = true
        }
        this.fileRef = this.$refs.pictureInput.image
      } else {
        this.fileRef = ''
      }
    },
    onRemove () {
      document.getElementsByClassName('preview-container')[0].style.display = 'block'
      this.fileRef = ''
      this.fileTitle = this.$t('editor.file.title')
      this.pdfSelected = false
      this.wordSelected = false
      this.excelSelected = false
      this.powerpointSelected = false
    }
  }
}
</script>

<style scoped>
  .fileTitle {
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
