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
import axios from 'axios';

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
      },
      boardID: 0
    }
  },
  created() {
    //create board
    /*axios
      .get('http://localhost:1337/api/boards/create')
      .then(response => {this.boardID = response.data})
      .catch(err => console.log(err));*/

    //post-request to api
    axios
      .get('http://localhost:1337/api/posts/' + this.boardID + '/all')
      .then(response => {this.notes = response})
      .catch(err => console.log(err));
  },
  methods: {
    createNote(b) {
      this.newNote.active = b;
    },
    addNote(note) {
      this.newNote.active = false;

      //post request to api
      axios
        .post('http://localhost:1337/api/boards/' + this.boardID + '/new', note.title, 'note', '{ text: ' + note.body + ' }', this.boardID)
        .then(res => {this.notes = this.notes})
        .catch(err => console.log(err));

      //post-request to api
      axios
        .get('http://localhost:1337/api/posts/' + this.boardID + '/all')
        .then(response => {this.notes = response})
        .catch(err => console.log(err));
    }
  }
}
</script>
