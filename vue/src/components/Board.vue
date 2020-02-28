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

          <!-- Display images of type JPEG -->
          <b-card
            v-if="note.typeOfPost === 'image/jpeg'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/jpeg;base64,' + note.content"
            >
            </b-card-img>
          </b-card>

          <!-- Display images of type PNG -->
          <b-card
            v-if="note.typeOfPost === 'image/png'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/png;base64,' + note.content"
            >
            </b-card-img>
          </b-card>

          <!-- Display PDF as link -->
          <b-card
            v-if="note.typeOfPost === 'application/pdf'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/pdf;base64,' + note.content">{{$t('board.download.pdf')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word 97-2003 document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msword'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/msword;base64,' + note.content">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + note.content">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel 97-2003 spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.ms-excel'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.ms-excel;base64,' + note.content">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + note.content">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint 97-2003 presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.ms-powerpoint'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.ms-powerpoint;base64,' + note.content">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + note.content">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
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

          <!-- Display images of type JPEG -->
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

          <!-- Display images of type PNG -->
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

          <!-- Display PDF as link -->
          <b-card
            v-if="note.typeOfPost === 'application/pdf'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/pdf;base64,' + note.content">{{$t('board.download.pdf')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word 97-2003 document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msword'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/msword;base64,' + note.content">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + note.content">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel 97-2003 spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msexcel'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/msexcel;base64,' + note.content">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + note.content">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint 97-2003 presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/mspowerpoint'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/mspowerpoint;base64,' + note.content">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + note.content">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
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
