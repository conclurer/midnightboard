<template>
  <div class="board">
    <div id="content">
      <div
        v-masonry="containerId"
        transition-duration="0s"
        item-selector=".item"
      >
        <div
          v-for="note in notes"
          :key="note.index"
          v-masonry-tile
          class="item"
        >
          <div class="slot">
            {{ note.id }}<br>{{ note.text }}
          </div>
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
    },
    randomText() {

      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
    width: 400px;
    background: #333;
    color: #fff;
    white-space: pre-line;
    margin: 10px 10px;
    padding: 5px;
  }
</style>
