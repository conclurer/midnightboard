<template>
  <div class="board">
    <img
      id="bg"
      src="../assets/background.jpg"
    >

    <div
      v-for="note in notes"
      :key="note.id"
    >
      <Note
        :note="note"
        style="position: absolute; top: 110px; left: 20px; width: 200px; height: 300px;}"
      />
    </div>

    <div v-if="newNote.active">
      <NewNote
        v-if="newNote.active"
        style="position: absolute; top: 300px; left: 670px; width: 200px; height: 300px;}"
        @add-note="addNote"
      />
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';
import NewNote from '@/components/NewNote.vue';

export default {
  name: 'Board',
  components: {
    Note,
    NewNote
  },
  props: ['notes', 'newNote'],
  methods: {
    addNote(newNote) {
      //Send up to parent
      this.$emit('add-note', newNote);
    }
  }
};
</script>

<style scoped>
    #bg {
        position: fixed;
        top: 80;
        left: 0;
        min-width: 100%;
        min-height: 100%;
    }
</style>
