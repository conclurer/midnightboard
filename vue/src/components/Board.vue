<template>
  <div class="board" id="bg">
    <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="note in notes" v-bind:key="note.index">
        <div class="slot"><p>{{note.text}}</p></div>
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
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      notes: [
        {
          index: 0,
          text: "Hello"
        },
        {
          index: 1,
          text: "World!"
        },
        {
          index: 2,
          text: "These"
        },
        {
          index: 3,
          text: "are"
        },
        {
          index: 4,
          text: "sample"
        },
        {
          index: 4,
          text: "notes."
        },
        {
          index: 1,
          text: "So"
        },
        {
          index: 2,
          text: "many"
        },
        {
          index: 3,
          text: "sample"
        },
        {
          index: 4,
          text: "notes"
        }
      ]
    };
  },
  props: [/*'notes', */'newNote'],
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
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
    min-width: 100%;
    height: 2000px;
    background-color: rgb(200, 200, 200);
  }

  .table {
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 20px;
  }

  .table-row {
    display: table-row;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .table-cell {
    display: table-cell;
    width: 25%;
    height: 100%;
    border-spacing: 20px;
  }

  .slot {
    display: inline-block;
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    height: 300px;
    background: #333;
    margin: 20px 20px;
  }

  #col0 {
    position: relative;
    top: 0%;
    left: 0%;
    
  }

  #col1 {
    position: relative;
    top: 0%;
    left: 0%;
  }

  #col2 {
    position: relative;
    top: 0%;
    left: 0%;
  }

  #col3 {
    position: relative;
    top: 0%;
    left: 0%;
  }

  @media (max-width: 359px) {

  }

  @media (min-width: 360) and (max-width: 719px) {

  }

  @media (min-width: 720px) and (max-width: 1079px) {

  }

  @media (min-width: 1080px) {
    /*#slot0 {
      width: 150px;
      height: 150px;
    }
    
    #slot1 {
      width: 150px;
      height: 150px;
    }

    #slot2 {
      width: 150px;
      height: 150px;
    }

    #slot3 {
      width: 150px;
      height: 150px;
    }

    #slot4 {
      width: 150px;
      height: 150px;
    }

    #slot5 {
      width: 150px;
      height: 150px;
    }

    #slot6 {
      width: 150px;
      height: 150px;
    }

    #slot7 {
      width: 150px;
      height: 150px;
    }*/
  }
</style>
