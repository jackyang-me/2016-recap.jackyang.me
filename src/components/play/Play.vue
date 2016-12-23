<style>
  .c-pageHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    color: rgba(0,0,0,.8);
  }
  .c-pageMain {
    margin-top: 45px;
    margin-bottom: 50px;
  }
  .c-pageFooter {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: none;
  }
  .c-pageFooter__submit {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 0;
    background-color: rgba(255,255,255,.9);
    color: rgba(0,0,0,.8);
  }

  .c-playPage__background {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    will-change: background-color;
    transition: background-color .3s ease;
  }
  .c-playPage__backgroundMask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: .2;
    /*
    background: -moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
    background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
    background: linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
    */
  }
</style>

<template>
  <div class="c-playPage">
    <div class="c-pageHeader">
      index: {{index}}, timer: {{time}}
    </div>
    <div class="c-pageMain">
      <circle-split :question="currentQuestion" :reveal="showOriginImage"></circle-split>
      <answer-picker :answers="answers" :selected="selected" @pick="handlePickAnswer"></answer-picker>
    </div>
    <div class="c-playPage__loading">
    </div>
    <div class="c-pageFooter">
      <button @click="handleSubmit" class="c-pageFooter__submit">Submit</button>
    </div>
    <div class="c-playPage__background" :style="{backgroundColor: backgroundColor}">
      <div class="c-playPage__backgroundMask"></div>
    </div>
  </div>
</template>

<script>
  import CircleSplit from './CircleSplit.vue'
  import AnswerPicker from './AnswerPicker.vue'

  const gameTotalTime = 60

  export default {
    components: {
      'circle-split': CircleSplit,
      'answer-picker': AnswerPicker
    },

    data () {
      return {
        currentQuestion: null,
        selected: null,
        answers: [],
        time: gameTotalTime,
        showOriginImage: false,
        backgroundColor: '#efefef',
        index: 0
      }
    },

    watch: {
      currentQuestion (value) {
        console.log('question change', value)
        if (value && value.selection) {
          this.answers = value.selection.map(a => {
            return {
              key: a.questionId,
              value: a.text
            }
          })
        } else {
          this.answers = []
        }

        if (value && value.image) {
          fetch(value.image + '?imageAve', {method: 'GET'})
            .then(response => response.json())
            .then(response => {
              this.backgroundColor = '#' + response.RGB.substring(2)
            })
        }
      }
    },

    mounted () {
      let that = this

      game = new Game({
        totalTime: gameTotalTime,
        onTick (ms) {
          that.time = parseInt(Math.round(ms / 1000))
        },
        onEnd () {
          that.time = 0
          console.log('game ended')
        },
        onDataLoaded () {
          game.start()
          that.currentQuestion = game.currentQuestion()
          that.index ++
        }
      })
    },

    methods: {
      handlePickAnswer (item) {
        this.selected = item.key
        this.showOriginImage = true

        document.body.scrollTop = 0

        setTimeout(() => {
          game.submitAnswer(this.selected)
          this.currentQuestion = game.nextQuestion()
          this.selected = null
          this.showOriginImage = false
          this.index ++
        }, 1000)
      },
      handleSubmit () {
        console.log('submit')
      }
    }
  }
</script>
