<template>
  <header class="header"  bg-variant="dark" text-variant="white" >
    <nav class="navbar navbar-inverse bg-dark fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#"><img src="../assets/logo.png" height="40px"></a>
        </div>
        <span class="navbar-text">
          Quality Assurance
        </span>
        <ul class="nav navbar-nav navbar-right">
          <li><table><tr><td><span style="margin-right: 40px;"><font-awesome-icon icon="plus" /> Add</span></td><td><span><font-awesome-icon icon="user-circle" /> Profile</span></td></tr></table></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'Header',
  methods: {
    /*newNote() {
      //Send up to parent
      this.$emit('new-note', true);
    }*/
    newNote(e) {
      e.preventDefault();
      const newNote = {
        text: 'New note'
      };

      //Send up to parent
      this.$emit('new-note', newNote);
    }
  }
};
</script>

<style scoped>
    .header {
      width: 100%;
      color: #fff;
      font-size: 20pt;
    }
</style>
