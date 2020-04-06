<template>
  <div class="board">
    <!-- Displays content when editor is not displayed -->
    <div
      class="inner-board"
      v-if="!editorActive"
      :key="editorActive"
    >
      <PostPanel
        :notes="notes"
        :upateKey="refreshBoard"
      />
    </div>

    <!-- Displays content when editor is displayed -->
    <div
      class="inner-board"
      v-if="editorActive"
      style="display: grid; grid-template-columns: 1fr 500px;"
    >
      <PostPanel
        style="grid-column: 1 / 2;"
        :notes="notes"
        :upateKey="editorActive"
      />

      <!-- Display right bar -->
      <div
        class="rightBar"
      >
        <div>
          <div v-smoothscrollbar="{ listener, options }">
            <EditorSidebar
              @add-note="addNote"
              @close="close"
              :boardId="boardId"
              :editorId="editorId"
            />
          </div>
        </div>
      </div>
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
  data () {
    return {
      refreshBoard: false,
      listener: () => {},
      options: {},
      pollResultMap: [], // links to pollShowResults
      pollShowResults: [],
      pollAVVPMap: [], // links to pollAnswers/pollVotes/pollVotesPercent
      pollAnswers: [],
      pollVotes: [],
      pollVotesPercent: []
    }
  },
  methods: {
    addNote: function () {
      // Notify notice board
      this.$emit('add-note')
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
    min-height: 100vh;
    background: var(--background-board);
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

  .rightBar {
    grid-column: 2 / 3;
    width: 500px;
    height: 100%;
    position: fixed;
    right: 0px;
    background: #fff;
  }
</style>
