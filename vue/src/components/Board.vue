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
              <img
                src="../assets/logo.png"
                height="40px"
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
          <b-card
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr>
            <b-card-text>
              <div v-html="renderText(note.content)" />
              <!--{{ note.content }}-->
            </b-card-text>
          </b-card>

          <!--<b-card
            title="Title"
            tag="note"
            style="width: 347px; margin: 10px;"
            class="mb-2"
          >
            <b-card-text>
              {{ note.text }}
            </b-card-text>
            <b-card-text>
              Last updated: 20.01.2020
            </b-card-text>
          </b-card>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  components: { },
  props: ['notes'],
  methods: {
    // Returns important parts of integrated HTML code
    renderText: function (text) {
      return text.slice(1, text.length - 1)
    }
  }
}
</script>

<style scoped>
  .board {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100vh;
    background: #7b8895;
  }

  #empty {
    width: 100%;
    font-size: 20pt;
  }

  #content {
    margin: 10px 10px;
  }

  .note {
    width: 355px;
    margin: 10px;
  }
</style>
