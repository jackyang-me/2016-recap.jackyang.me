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
    <welcome-page @start="handleStart"></welcome-page>
    <play-page v-if="status === 'start'" @end="handleEnd"></play-page>
    <end-page v-if="status === 'end'" :result="result"></end-page>
  </div>
</template>

<script>
import Play from './components/play/Play.vue'
import Welcome from './components/welcome/Welcome.vue'
import End from './components/end/End.vue'
export default {
  name: 'app',
  components: {
    'welcome-page': Welcome,
    'play-page': Play,
    'end-page': End
  },
  data () {
    return {
      status: 'end',
      result: ''
    }
  },
  methods: {
    handleStart () {
      this.status = 'start'
    },
    handleEnd (result) {
      this.status = 'end'
      this.result = result
    }
  }
}
</script>
