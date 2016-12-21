import Vue from 'vue'
import App from './App.vue'
import Game from './Game'

window.Game = Game
window.game = null

new Vue({
  el: '#app',
  render: h => h(App)
})
