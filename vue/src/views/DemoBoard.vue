<template>
  <div class="home">
    <Header v-on:new-note="createNote" />
    <Board v-bind:notes="notes" v-bind:newNote="newNote" v-on:add-note="addNote" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Board from '@/components/Board.vue';

export default {
  name: 'Demo',
  components: {
    Header,
    Board
  },
  data() {
    return {
      notes: [],
      newNote: {
        "active": false
      }
    }
  },
  methods: {
    createNote(b) {
      this.newNote.active = b;
    },
    addNote(newNote) {
      this.notes = [...this.notes, newNote];
      this.newNote.active = false;
    }
  }
}
</script>
