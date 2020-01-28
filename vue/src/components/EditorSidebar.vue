<template>
  <div class="editorSidebar">
    <div class="upperGap">
    </div>
    <NoteEditor 
      v-on:create-note="createNote"
    />
  </div>
</template>

<script>
import axios from 'axios';
import NoteEditor from '@/components/NoteEditor.vue';

export default {
  components: {
    NoteEditor
  },
  data() {
    return {
      boardId: 4
    };
  },
  methods: {
    createNote: async function(titleContent, jsonContent) {
      const jsonBody = JSON.stringify({
        title: titleContent,
        type: 'note',
        content: jsonContent
      })
      console.log(jsonBody)

      // Post request to api
      await axios
        .post('http://localhost:1337/api/boards/' + this.boardId + '/new', jsonBody, {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(res => {})
        .catch(err => console.log(err));
      
        // Notify notice board
        this.$emit('add-note');
    }
  }
}
</script>

<style scoped>
  .upperGap {
    position: relative;
    top: 0px;
    left: 0px;
    height: 100px;
    width: 100%;
  }
</style>