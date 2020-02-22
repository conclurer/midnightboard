<template>
  <div class="board">
    <!-- Placeholder for right positioning -->
    <div
      id="empty"
      style="grid-row: 1;"
    >
      <nav class="navbar navbar-inverse bg-dark">
        <div class="container-fluid">
          <span class="navbar-text">
            Title
          </span>
        </div>
      </nav>
    </div>

    <!-- Space for content -->
    <div
      v-if="!this.editorActive"
      class="content"
      style="grid-row: 2;"
      :key="renderKey"
    >
      <div
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
      v-if="this.editorActive"
      style="grid-row: 2; display: grid; grid-template-columns: repeat(3, 1fr);"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
        style="grid-column: 1 / 3;"
        :key="renderKey"
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

      <!-- Display rigth bar style="width: 33%; height: auto; position: absolute; top: 0px; right: 0px;" -->
      <div
        class="rightBar"
        style="grid-column: 3 / 4;"
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
  props: ['notes', 'editorActive', 'renderKey']
}
</script>

<style scoped>
@import '../../../configuration/styles.css';
.board {
  position: static;
  width: 100vw;
  min-height: 100vh;
  background: var(--background-board);
  display: grid;
}

hr {
  height: 1px;
  border: none;
  background-color: #aaa;
}

#empty {
  position: static;
  width: 100vw;
  font-size: 20pt;
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
  margin-top: 0px;
  background: #fff;
}
</style>
