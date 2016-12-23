import 'whatwg-fetch'
import Vue from 'vue'
import VueTap from 'v-tap'
import App from './App.vue'
import Game from './Game'

window.Game = Game
window.game = null

Vue.use(VueTap)

new Vue({
  el: '#app',
  render: h => h(App)
})
