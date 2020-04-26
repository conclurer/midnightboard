<!-- Error 404 page. Displayed when the requested page can't be found -->
<template>
  <div class="m">
    <div class="t">
      <p>404</p>
    </div>
    <div class="b">
      <h2><b>Page not found</b></h2>
    </div>
  </div>
</template>;

<style scoped>
  .m {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #FFF;
  }

  .t{
    height: 65vh;
    background: #444;
  }

  p {
    font-size: 40vw;
    height:40vw;
    font-weight: bold;
    color: #FFF;
    position: absolute;
    bottom: 0;
    left:0;
    transform: translate(25%,-35vh);
  }

  h2{
    margin-top: 5vw;
    font-size: 80px;
  }
</style>
