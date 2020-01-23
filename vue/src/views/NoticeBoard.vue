<template>
  <div
    class="home"
  >
    <Header
      id="titlebar"
      @new-note="createNote"
    />
    <Board
      :notes="notes"
      @add-note="addNote"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Board from '@/components/Board.vue';
import axios from 'axios';

export default {
  name: 'NoticeBoard',
  components: {
    Header,
    Board
  },
  data() {
    return {
      notes: [],
      boardID: 1
    };
  },
  created() {
    axios
      .get('http://localhost:1337/api/posts/all/' + this.boardID)
      .then(response => { this.notes = JSON.parse(response.data) })
      .catch(err => console.log(err));
  },
  methods: {
    createNote(newNote) {
      //this.newNote.active = b;
      this.notes = [...this.notes, newNote];
    },
    addNote(newNote) {
      //this.newNote.active = false;

      //post request to api
      /*axios
        .post('http://localhost:1337/api/boards/' + this.boardID + '/new', 0, note.title, 'note', '{ text: ' + note.body + ' }', this.boardID)
        .then(res => {this.notes = this.notes;})
        .catch(err => console.log(err));
      */

      //post-request to api
      /*axios
        .get('http://localhost:1337/api/posts/' + this.boardID + '/all')
        .then(response => {this.notes = response;})
        .catch(err => console.log(err));
      */
    }
  }
};
</script>

<style scoped>
  .home {
    position: relative;
  }
</style>
