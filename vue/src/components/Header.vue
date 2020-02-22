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
            src="../../../configuration/logo.png"
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
                  ><a @click="changeLanguage">&#127465;&#127466;</a></span>
                  <span
                    id="flag"
                    v-if="!english"
                    class="unselectable"
                    unselectable="on"
                  ><a @click="changeLanguage">&#127468;&#127463;</a></span>
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
  props: ['english'],
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
  }

  .header {
    width: 100%;
    height: 70px;
    color: #fff;
    font-size: 20pt;
  }

  .unselectable {
    -moz-user-select:none;
    -webkit-user-select:none;
  }

  #flag {
    font-size: 25px;
  }
</style>
