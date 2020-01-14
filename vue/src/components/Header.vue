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
    <div
      id="title"
      align="center"
    >
      <span
        id="headline"
        align="center"
        style="vertical-align:middle"
      >
        Quality Assurance
      </span>
    </div>
    <div id="buttons">
      <div
        id="plus"
        @click="newNote"
      >
        <font-awesome-icon
          icon="plus"
          pull="right"
        />
      </div>
      <div
        id="file"
        @click="newNote"
      >
        <font-awesome-icon
          icon="file-medical"
          pull="right"
        />
      </div>
      <div id="profile">
        <font-awesome-icon
          icon="user-circle"
          pull="right"
        />
      </div>
      <div id="settings">
        <font-awesome-icon
          icon="cog"
          pull="right"
        />
      </div>
    </div>
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
        top: 0px;
        right: 25%;
        width: 25%;
        height: 7vh;
        text-align: right;
      }

      #plus {
        position: absolute;
        right: 32vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #file {
        position: absolute;
        right: 25vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #profile {
        position: absolute;
        right: 7vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #settings {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 5vh;
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
        top: 0px;
        right: 25%;
        width: 25%;
        height: 7vh;
        text-align: right;
      }

      #plus {
        position: absolute;
        right: 32vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #file {
        position: absolute;
        right: 25vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #profile {
        position: absolute;
        right: 7vh;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }

      #settings {
        position: absolute;
        right: 0px;
        bottom: 0px;
        width: 5vh;
        height: 90%;
        font-size: 5vh;
      }
    }
</style>
