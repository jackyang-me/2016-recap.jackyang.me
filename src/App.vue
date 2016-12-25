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
    <!--<welcome-page></welcome-page>-->
    <play-page></play-page>
  </div>
</template>

<script>
import Play from './components/play/Play.vue'
import Welcome from './components/welcome/Welcome.vue'
export default {
  name: 'app',
  components: {
    'welcome-page': Welcome,
    'play-page': Play
  }
}
</script>
