<template>
  
  <div class="board" align="center">
    <perfect-scrollbar>
    <div id="content" align="center">
    <div align="center" v-masonry="containerId" transition-duration="0s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="note in notes" v-bind:key="note.index">
        <div class="slot"></div>
      </div>
    </div>
    </div>
    </perfect-scrollbar>
  </div>
  
</template>

<script>
//import Note from '@/components/Note.vue';
//import NewNote from '@/components/NewNote.vue';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'Board',
  components: {
    //Note,
    //NewNote
    PerfectScrollbar
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
  .board {
    position: absolute;
    width: 100%;
    min-height: 90vh;
    background-color: rgb(200, 200, 200);
  }

  #content {
    margin: 20px 20px;
  }

  .slot {
    display: inline-block;
    width: 300px;
    height: 300px;
    background: #333;
    margin: 10px 10px;
  }
</style>
