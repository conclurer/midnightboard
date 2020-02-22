<template>
  <div class="board">
    <!-- Space for content -->
    <div
      class="inner-board"
      v-if="!this.editorActive"
      :key="editorActive"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
      >
        <div
          v-for="note in notes.slice().reverse()"
          :key="note.index"
          v-masonry-tile
          class="item"
        >
          <!-- Display common text notes -->
          <b-card
            v-if="note.typeOfPost === 'application/note'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-html="note.content" />
            </b-card-text>
          </b-card>

          <!-- Display images -->
          <b-card
            v-if="note.typeOfPost === 'image/png'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/png;base64,'+note.content"
            >
            </b-card-img>
          </b-card>

          <!-- Display images -->
          <b-card
            v-if="note.typeOfPost === 'image/jpeg'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/jpeg;base64,'+note.content"
            >
            </b-card-img>
          </b-card>
        </div>
      </div>
    </div>

    <!-- Space for content -->
    <div
      class="inner-board"
      v-if="this.editorActive"
      style="display: grid; grid-template-columns: 1fr 500px;"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
        style="grid-column: 1 / 2;"
        :key="editorActive"
      >
        <div
          v-for="note in notes.slice().reverse()"
          :key="note.index"
          v-masonry-tile
          class="item"
        >
          <!-- Display common text notes -->
          <b-card
            v-if="note.typeOfPost === 'application/note'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-html="note.content" />
            </b-card-text>
          </b-card>

          <!-- Display png images -->
          <b-card
            v-if="note.typeOfPost === 'image/png'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/png;base64,'+note.content"
            >
            </b-card-img>
          </b-card>

          <!-- Display jpg images -->
          <b-card
            v-if="note.typeOfPost === 'image/jpeg'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/jpeg;base64,'+note.content"
            >
            </b-card-img>
          </b-card>
        </div>
      </div>

      <!-- Display rigth bar -->
      <div
        class="rightBar"
      >
        <div>
          <div v-smoothscrollbar="{ listener, options }">
            <EditorSidebar
              @add-note="addNote"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditorSidebar from '@/components/EditorSidebar.vue'

export default {
  name: 'Board',
  components: {
    EditorSidebar
  },
  data () {
    return {
      listener: () => {},
      options: {}
    }
  },
  methods: {
    addNote: async function () {
      // Notify notice board
      this.$emit('add-note')
    }
  },
  props: ['notes', 'editorActive']
}
</script>

<style scoped>
@import '../../../configuration/styles.css';
.board {
  position: sticky;
  width: 100vw;
  min-height: 100vh;
  background: var(--background-board);
  display: grid;
  grid-auto-rows: min-content;
}

.inner-board {
  grid-row: 1 / 1;
}

hr {
  height: 1px;
  border: none;
  background-color: #aaa;
}

.content {
  position: static;
  margin: 10px 10px;
}

.note {
  width: 480px;
  margin: 10px;
}

.rightBar {
  grid-column: 2 / 3;
  width: 500px;
  height: 100%;
  position: fixed;
  right: 0px;
  background: #fff;
}
</style>
