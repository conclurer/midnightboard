<template>
  <header class="header">
    <div id="logo">
      <span id="image">
        <router-link to="/">
          <img
            alt="Conclurer"
            src="../assets/logo.png"
            align="left"
            height="100%"
          >
        </router-link>
      </span>
    </div>
    <div id="title" align="center">
      <span id="headline" align="center" style="vertical-align:middle">
        Quality Assurance
      </span>
    </div>
    <div id="buttons">
      <span id="plus" @click="newNote">
        <font-awesome-icon icon="plus" pull="right" style="vertical-align:middle" />
      </span>
    </div>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import uuid from 'uuid';
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
        id: uuid.v4(),
        text: "Hallo"
      }

      //Send up to parent
      this.$emit('new-note', newNote);
    }
  }
};
</script>

<style scoped>
    @media (max-width: 719px) {
      .header {
        width: 100%;
        height: 12vh;
        color: #fff;
      }

      #logo {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 25%;
      }

      #image {
        height: 7vh;
        width: auto;
        display: block;
      }
    
      #title {
        position: absolute;
        top: 45%;
        left: 0px;
        width: 100%;
        height: 7vh;
        text-align: center;
      }

      #headline {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 90%;
        font-size: 5vh;
        vertical-align: center;
      }

      #buttoms {
        position: absolute;
        left: 75%;
        width: 25%;
        height: 7vh;
        text-align: right;
      }

      #plus {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 90%;
        font-size: 5vh;
      }
    }

    @media (min-width: 720px) {
      .header {
        width: 100%;
        height: 8vh;
        color: #fff;
      }

      #logo {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 25%;
      }

      #image {
        height: 7vh;
        width: auto;
        display: block;
      }
    
      #title {
        position: absolute;
        left: 25%;
        width: 50%;
        height: 7vh;
        text-align: center;
      }

      #headline {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 90%;
        font-size: 5vh;
        vertical-align: center;
      }

      #buttoms {
        position: absolute;
        left: 75%;
        width: 25%;
        height: 7vh;
        text-align: right;
      }

      #plus {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 90%;
        font-size: 5vh;
      }
    }
</style>
