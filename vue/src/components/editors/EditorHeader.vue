<template>
  <div
    class="editor-header"
  >
    <!-- Table for layout -->
    <table>
      <tr>
        <td class="left-column">
        </td>
        <td class="middle-column">
          <h2>{{editorTitle}}</h2>
        </td>
        <td class="right-column">
          <a>
            <span
              class="unselectable"
              unselectable="on"
            >
              <font-awesome-icon icon="times" class="cross" @click="close" />
            </span>
          </a>
        </td>
      </tr>
      <tr>
        <td class="left-column">
        </td>
        <td class="middle-column">
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
        </td>
        <td class="right-column">
        </td>
      </tr>
    </table>
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
  table {
    width: 100%;
  }

  .editor-header {
    width: 100%;
    color: #000;
    font-size: 20pt;
    padding-top: 12px;
  }

  .left-column {
    width: 10%;
  }

  .middle-column {
    width: 80%
  }

  .right-column {
    width: 10%;
    text-align: right;
    vertical-align: top;
  }

  .cross {
    float: right;
    color: #000;
  }

  .datePicker {
    width: 300px;
    z-index: 10003;
  }
</style>
