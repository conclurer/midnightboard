<template>
  <header class="header">
    <!--<table cellpadding="0" cellspacing="0">
      <tr>
        <td width="auto">
          <router-link to="/">
            <span id="image">
              <img
                alt="Conclurer"
                src="../assets/logo.png"
                align="left"
                height="100%"
             >
            </span>
          </router-link>
        </td>
        <td>
        </td>
        
        <td width="34%">
          <span id="headline" align="center" style="vertical-align:middle">
            Quality Assurance
          </span>
        </td>
        <td width="31%">
          <div @click="newNote">
            <font-awesome-icon icon="plus" size="2x" pull="right" />
          </div>
        </td>
        <td width="2%">
        </td>
      </tr>
    </table>
    -->
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
    <div id="plus" @click="newNote">
      <font-awesome-icon icon="plus" pull="right" />
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
    newNote() {
      //Send up to parent
      this.$emit('new-note', true);
    }
  }
};
</script>

<style scoped>
    @media (max-width: 719px) {
      .header {
        width: 100%;
        height: 100%;
        color: #fff;
      }

      #image {
        height: 7vh;
        width: auto;
        display: block;
      }

      #logo {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 25%;
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

      #plus {
        position: absolute;
        bottom: 0px;
        left: 75%;
        width: 25%;
        height: 90%;
        font-size: 5vh;
      }
    }

    @media (min-width: 720px) {
      .header {
        width: 100%;
        height: 100%;
        color: #fff;
      }

      #image {
        height: 7vh;
        width: auto;
        display: block;
      }

      #logo {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 25%;
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

      #plus {
        position: absolute;
        bottom: 0px;
        left: 75%;
        width: 25%;
        height: 90%;
        font-size: 5vh;
      }
    }
</style>
