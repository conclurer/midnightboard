<template>
  <div class="board">
    <div id="content">
      <div v-masonry="containerId" transition-duration="0s" item-selector=".item">
        <div v-masonry-tile class="item" v-for="note in notes" v-bind:key="note.index">
          <div class="slot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Note from '@/components/Note.vue';
//import NewNote from '@/components/NewNote.vue';

export default {
  name: 'Board',
  components: {
    //Note,
    //NewNote
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
  @media (max-width: 719px) {
    .board {
      min-height: 86vh;
    }
  }

  @media (min-width: 720px) {
    .board {
      min-height: 90vh;
    }
  }

  .board {
    position: absolute;
    width: 100%;
    background-color: rgb(200, 200, 200);
  }

  #content {
    margin: 10px 10px;
  }

  .slot {
    display: inline-block;
    width: 450px;
    height: 300px;
    background: #333;
    margin: 10px 10px;
  }
</style>
