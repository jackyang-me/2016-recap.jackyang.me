<style>
  .c-pageHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 10px;
    background-color: rgba(255,255,255,.1);
    color: rgba(255,255,255,.8);
  }
  .c-pageMain {
    margin-top: 45px;
    margin-bottom: 50px;
  }
  .c-pageFooter {
    position: fixed;
    bottom: 0;
    width: 100%;
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
</style>

<template>
  <div class="c-playPage">
    <div class="c-pageHeader">
      index: {{currentQuestion ? currentQuestion.id : ''}}, timer: {{time}}
    </div>
    <div class="c-pageMain">
      <circle-split :question="currentQuestion"></circle-split>
      <answer-picker :answers="answers" :selected="selected" @pick="handlePickAnswer"></answer-picker>
    </div>
    <div class="c-playPage__loading">
    </div>
    <div class="c-pageFooter">
      <button @click="handleSubmitAnswer" class="c-pageFooter__submit">Submit</button>
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
        time: gameTotalTime
      }
    },

    computed: {
      answers () {
        if (this.currentQuestion && this.currentQuestion.selection) {
          return this.currentQuestion.selection.map(a => {
            return {
              key: a.questionId,
              value: a.text
            }
          })
        } else {
          return []
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
        }
      })
      game.start()
      this.currentQuestion = game.currentQuestion()
    },

    methods: {
      handlePickAnswer (item) {
        this.selected = item.key
      },
      handleSubmitAnswer () {
        game.submitAnswer(this.selected)
        this.currentQuestion = game.nextQuestion()
        this.selected = null
      }
    }
  }
</script>
