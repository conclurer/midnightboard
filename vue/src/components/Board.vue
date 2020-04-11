<template>
  <div class="board">
    <!-- Displays content when editor is displayed -->
    <div
      class="inner-board"
      v-if="editorActive"
      style="display: grid; grid-template-columns: 1fr 500px;"
    >
      <PostPanel
        @reload-board="reloadBoard"
        style="grid-column: 1 / 2;"
        :notes="notes"
        :upateKey="editorActive"
      />

      <!-- Display right bar -->
      <div
        class="right-bar"
      >
        <div>
          <EditorSidebar
            @add-note="addNote"
            @close="close"
            :boardId="boardId"
            :editorId="editorId"
          />
        </div>
      </div>
    </div>

    <!-- Displays content when editor is not displayed -->
    <div
      class="inner-board"
      v-else
    >
      <PostPanel
        @reload-board="reloadBoard"
        :notes="notes"
        :upateKey="editorActive"
      />
    </div>
  </div>
</template>

<script>
import PostPanel from '@/components/PostPanel.vue'
import EditorSidebar from '@/components/EditorSidebar.vue'

export default {
  name: 'Board',
  components: {
    PostPanel,
    EditorSidebar
  },
  methods: {
    addNote: function () {
      // Notify notice board
      this.$emit('add-note')
    },
    // Used to reload the board when a note gets deleted
    reloadBoard: function () {
      this.$emit('reload-board')
    },
    // Used to close the sidebars
    close: function () {
      this.$emit('close')
    }
  },
  props: ['notes', 'boardId', 'editorActive', 'editorId']
}
</script>

<style scoped>
  .board {
    position: sticky;
    width: 100%;
    display: grid;
    grid-auto-rows: min-content;
  }

  .inner-board {
    grid-row: 1 / 2;
  }

  li {
    display: list-item;
  }

  ul {
    text-align: left;
  }

  a {
    color: var(--link);
  }

  .right-bar {
    grid-column: 2 / 3;
    width: 500px;
    height: 100%;
    position: fixed;
    right: 0px;
    background: #fff;
  }
</style>
