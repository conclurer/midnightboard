<template>
  <header
    class="header"
  >
    <!-- Bootstrap-Vue navbar -->
    <b-navbar variant="dark" type="white" fixed="top">
      <b-navbar-brand href="#">
        <img src="../../../configuration/logo.png" height="40px" alt="Logo">
      </b-navbar-brand>
      <b-nav-text>
        |
      </b-nav-text>
      <b-nav-text>
        {{ title }}
      </b-nav-text>
      <b-navbar-nav class="ml-auto">
        <div
          v-if="buttonsActive"
        >
          <b-nav-item>
            <span
              class="unselectable"
              unselectable="on"
            ><a @click="plusClicked"><font-awesome-icon icon="plus" /> {{$t('ui.add')}}</a></span>
          </b-nav-item>
          <b-nav-item>
            <span
              class="unselectable"
              unselectable="on"
            ><font-awesome-icon icon="user-circle" /> {{$t('ui.profile')}}</span>
          </b-nav-item>
          <b-nav-item>
            <span
              id="flag"
              v-if="english"
              class="unselectable"
              unselectable="on"
            ><a @click="changeLanguage">&#127465;&#127466;</a>
            </span>
              <span
                id="flag"
                v-if="!english"
                class="unselectable"
                unselectable="on"
              ><a @click="changeLanguage">&#127468;&#127463;</a>
            </span>
          </b-nav-item>
        </div>
        <div
          v-else
        >
          <b-nav-item>
            <span
              id="flag"
              v-if="english"
              class="unselectable"
              unselectable="on"
            ><a @click="changeLanguage">&#127465;&#127466;</a></span>
            <span
              id="flag"
              v-if="!english"
              class="unselectable"
              unselectable="on"
            ><a @click="changeLanguage">&#127468;&#127463;</a></span>
          </b-nav-item>
        </div>
      </b-navbar-nav>
    </b-navbar>

    <!-- Bootstrap navbar
    <nav class="navbar navbar-inverse bg-dark fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a
            class="navbar-brand"
            href="#"
          ><img
            src="../../../configuration/logo.png"
            height="40px"
          ></a>
        </div>
        <div class="navbar-text" align="center" style="background: #ffffff;">
          Quality Assurance
        </div>
        <navbar-text class="navbar-text" align="center" style="background: #ffffff;">
          Quality Assurance
        </div>
        <div
          v-if="buttonsActive"
        >
          <ul class="nav navbar-nav navbar-right">
            <li>
              <table>
                <tr>
                  <td>
                    <span
                      class="unselectable"
                      unselectable="on"
                      style="margin-right: 40px;"
                    ><a @click="plusClicked"><font-awesome-icon icon="plus" /> {{$t('ui.add')}} </a></span>
                  </td><td>
                    <span
                      class="unselectable"
                      unselectable="on"
                      style="margin-right: 30px;"
                    ><font-awesome-icon icon="user-circle" /> {{$t('ui.profile')}} </span>
                  </td><td>
                    <span
                      id="flag"
                      v-if="english"
                      class="unselectable"
                      unselectable="on"
                    ><a @click="changeLanguage">&#127465;&#127466;</a>
                    </span>
                    <span
                      id="flag"
                      v-if="!english"
                      class="unselectable"
                      unselectable="on"
                    ><a @click="changeLanguage">&#127468;&#127463;</a>
                    </span>
                  </td>
                </tr>
              </table>
            </li>
          </ul>
        </div>
        <div
          v-else
        >
          <span
            id="flag"
            v-if="english"
            class="unselectable"
            unselectable="on"
          ><a @click="changeLanguage">&#127465;&#127466;</a></span>
          <span
            id="flag"
            v-if="!english"
            class="unselectable"
            unselectable="on"
          ><a @click="changeLanguage">&#127468;&#127463;</a></span>
        </div>
      </div>
    </nav>-->
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['english', 'buttonsActive', 'title'],
  methods: {
    plusClicked (e) {
      e.preventDefault()

      // Send up to parent
      this.$emit('plus-clicked')
    },
    changeLanguage (e) {
      e.preventDefault()

      // Send up to parent
      this.$emit('change-language')
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
    color: #ffffff;
  }

  .header {
    width: 100%;
    height: 70px;
    color: #fff;
    font-size: 20pt;
  }

  .unselectable {
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  #flag {
    font-size: 25px;
  }

  li {
    margin: 0 10px;
  }
</style>
