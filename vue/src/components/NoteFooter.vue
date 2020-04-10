<template>
  <div
    class="note-footer"
  >
    <span v-if="dueDate !== null">
      <b-container fluid>
        <b-row>
          <b-col cols="auto" class="mr-auto text-left">{{ formattedDate }}</b-col>
          <b-col cols="auto" class="text-right"><a><font-awesome-icon icon="trash-alt" @click="deletePost" /></a></b-col>
        </b-row>
      </b-container>
    </span>
    <span v-else>
      <b-container fluid>
        <b-row>
          <b-col cols="auto" class="ml-auto text-right"><a><font-awesome-icon icon="trash-alt" @click="deletePost" /></a></b-col>
        </b-row>
      </b-container>
    </span>
  </div>
</template>

<script>
import { i18n } from '@/main.js'

export default {
  name: 'NoteFooter',
  props: ['dueDate'],
  computed: {
    // Date displayed in the note footer
    formattedDate: function () {
      return new Date(this.dueDate * 1).toLocaleDateString(i18n.locale)
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
</style>
