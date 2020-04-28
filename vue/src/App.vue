<!-- The main class of the website. All views and components are rendered inside of this one -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  @viewport {
    max-zoom: 2.0;
    min-zoom: 0.5;
  }

  body {
    overflow-x: hidden;
    overflow-y: scroll;
    padding-top: calc(28px + 2vh);
  }

  a {
    cursor: pointer;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .ProseMirror {
    border: 1px solid #4d90fe;
    border-radius: 3px;
    outline: none;
  }
</style>
