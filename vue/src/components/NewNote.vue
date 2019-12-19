<template>
  <div class="newNote">
    <form
      autocomplete="off"
      @submit="addTodo"
    >
      <div class="newNoteHeader">
        <input
          v-model="title"
          type="text"
          name="title"
          placeholder="Title"
        >
      </div>
      <div class="newNoteBody">
        <table>
          <tr>
            <td>
              <textarea
                v-model="body"
                rows="13"
                cols="20"
                name="body"
                placeholder="Text"
                style="resize: none"
              />
            </td>
          </tr>
          <tr>
            <input
              type="submit"
              value="Add"
            >
          </tr>
        </table>
      </div>
    </form>
  </div>
</template>

<script>
import uuid from 'uuid';
import axios from 'axios';

export default {
  name: 'NewNote',
  data() {
    return {
      title: '',
      body: ''
    };
  },
  methods: {
    addTodo(e) {
      e.preventDefault();
      if(this.body !== '') {
        const newNote = {
          id: uuid.v4(),
          title: this.title,
          text: this.body,
          xPosition: 0,
          yPosition: 0,
          width: 200,
          height: 300
        };

        //Send up to parent
        this.$emit('add-note', newNote);
      }
    }
  }
};
</script>

<style scoped>
    .newNote {
        z-index: 1;
    }

    .newNoteHeader {
        height: 30px;
        background: #ffeb81;
        color: #000;
        text-align: center;
        display : flex;
        align-items : center;
        justify-content: center;
    }

    .newNoteBody {
        height: 270px;
        background: #fff2ab;
        color: #000;
        text-align: center;
        display : flex;
        align-items : center;
        justify-content: center;
    }
</style>
