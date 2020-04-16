<!-- This bar is displayed on top of the editor sidebar -->
<template>
  <div
    class="editor-header"
  >
    <b-container fluid>
      <b-row>
        <b-col
          cols="1"
        >
        </b-col>
        <b-col
          cols="10"
        >
          <h2>{{editorTitle}}</h2>
        </b-col>
        <b-col
          class="text-right"
          cols="1"
        >
          <a>
            <span
              class="unselectable"
              unselectable="on"
            >
              <font-awesome-icon icon="times" class="cross" @click="close" />
            </span>
          </a>
        </b-col>
      </b-row>
    </b-container>
    <VueCtkDateTimePicker
      id="DatePicker"
      class="datePicker"
      format="YYYY-MM-DD"
      formatted="ll"
      onlyDate
      v-model="date"
      color="#F9A618"
      :label="$t('editor.datePicker.dueDate')"
      :buttonNowTranslation="$t('editor.datePicker.currentDate')"
      :locale="$t('editor.datePicker.language')"
    >
    </VueCtkDateTimePicker>
  </div>
</template>

<script>
export default {
  name: 'EditorHeader',
  props: ['editorTitle'],
  data () {
    return {
      date: null
    }
  },
  watch: {
    // This funtion is triggered when the date property changes. It sends the
    // date to the editor sidebar, which is responsible for creating new notes
    date: function (date) {
      this.$emit('update-date', date)
    }
  },
  methods: {
    // Used to load an editor to the sidebar
    selectEditor: function (selection) {
      switch (selection) {
        case 'text':
          this.$emit('select-editor', 0)
          break
        case 'image':
          this.$emit('select-editor', 1)
          break
        case 'file':
          this.$emit('select-editor', 2)
          break
        case 'poll':
          this.$emit('select-editor', 3)
          break
        case 'survey':
          this.$emit('select-editor', 4)
          break
        default:
      }
    },
    // Used to close the editor sidebar
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .editor-header {
    width: 100%;
    color: #000;
    font-size: 20pt;
    padding-top: 12px;
  }

  .cross {
    color: #000;
  }

  .datePicker {
    width: 90%;
    z-index: 10003;
  }
</style>
