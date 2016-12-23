<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0;
    background: #efefef;
  }
</style>

<template>
  <div id="app">
    <play-page></play-page>
  </div>
</template>

<script>
import Play from './components/play/Play.vue'
export default {
  name: 'app',
  components: {
    'play-page': Play
  }
}
</script>
