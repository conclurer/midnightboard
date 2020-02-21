<template>
  <div class="board">
    <!-- Empty space behind header -->
    <div id="empty">
      <nav class="navbar navbar-inverse bg-dark">
        <div class="container-fluid">
          <div class="navbar-header">
            <span
              class="navbar-brand"
              href="#"
            >
            </span>
          </div>
          <span class="navbar-text">
            Quality Assurance
          </span>
          <ul class="nav navbar-nav navbar-right">
            <li><table><tr><td><span style="margin-right: 40px;"><font-awesome-icon icon="plus" /> Add</span></td><td><span><font-awesome-icon icon="user-circle" /> Profile</span></td></tr></table></li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Space for content -->
    <div id="content">
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
  </div>
</template>

<script>
export default {
  name: 'Board',
  components: { },
  props: ['notes']
}
</script>

<style scoped>
  @import '../../../configuration/styles.css';
  
  .board {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100vh;
    background: var(--background-board);
  }

  hr {
    height: 1px;
    border: none;
    background-color: #aaa;
  }

  #empty {
    width: 100%;
    font-size: 20pt;
  }

  #content {
    margin: 10px 10px;
  }

  .note {
    width: 480px;
    margin: 10px;
  }
</style>
