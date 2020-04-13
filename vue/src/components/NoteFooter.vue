<template>
  <div
    class="note-footer"
  >
    <b-container fluid>
      <b-row>
        <b-col
          v-if="dueDate !== null"
          class="mr-auto text-left no-padding"
          cols="auto"
        >
          {{ $t('ui.due') + formattedDate }}
        </b-col>
        <b-col
          v-if="deleteRight"
          class="ml-auto text-right no-padding"
          cols="auto"
        >
          <a>
            <font-awesome-icon icon="trash-alt" @click="deletePost" />
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { i18n } from '@/main.js'

export default {
  name: 'NoteFooter',
  props: ['creatorId', 'dueDate'],
  computed: {
    // Date displayed in the note footer
    formattedDate: function () {
      return new Date(this.dueDate * 1).toLocaleDateString(i18n.locale)
    },
    deleteRight: function () {
      if (window.localStorage.getItem('mnb_rid')) {
        if (window.localStorage.getItem('mnb_rid') === '0') {
          return true
        } else if (window.localStorage.getItem('mnb_uid') === this.creatorId.toString()) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    // Used to command the deletion of a post
    deletePost: function () {
      this.$emit('delete-post')
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }

  .no-padding {
    padding: 0px;
  }
</style>
