<template>
  <header
    class="header"
    bg-variant="dark"
    text-variant="white"
  >
    <nav class="navbar navbar-inverse bg-dark fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a
            class="navbar-brand"
            href="#"
          ><img
            src="../assets/logo.png"
            height="40px"
          ></a>
        </div>
        <span class="navbar-text">
          Quality Assurance
        </span>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <table>
              <tr>
                <td>
                  <span
                    class="unselectable"
                    unselectable="on"
                    style="margin-right: 40px;"
                  ><a @click="plusClicked"><font-awesome-icon icon="plus" /> Add</a></span>
                </td><td>
                  <span
                    class="unselectable"
                    unselectable="on"
                  ><font-awesome-icon icon="user-circle" /> Profile</span>
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    plusClicked (e) {
      e.preventDefault()

      // Send up to parent
      this.$emit('plus-clicked')
    },
    newNote (e) {
      e.preventDefault()
      const newNote = {
        text: 'New note'
      }

      // Send up to parent
      this.$emit('new-note', newNote)
    }
  }
}
</script>

<style scoped>
    a {
      cursor: pointer;
    }

    .header {
      width: 100%;
      color: #fff;
      font-size: 20pt;
    }

    .unselectable {
      -moz-user-select:none;
      -webkit-user-select:none;
    }
</style>
