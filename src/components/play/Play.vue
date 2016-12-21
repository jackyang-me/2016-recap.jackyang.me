<template>
  <div class="c-playPage">
    <play-header></play-header>
    <div class="c-playPage__main">
      <circle-split :question="currentQuestion"></circle-split>
      <answer-picker :answers="answers" @pick="handlePick"></answer-picker>
    </div>
    <div class="c-playPage__loading">
    </div>
    <play-footer @submit="handleSubmit"></play-footer>
  </div>
</template>

<script>
  import CircleSplit from './CircleSplit.vue'
  import AnswerPicker from './AnswerPicker.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'

  export default {
    components: {
      'play-header': Header,
      'play-footer': Footer,
      'circle-split': CircleSplit,
      'answer-picker': AnswerPicker
    },

    data () {
      return {
        answers: [],
        currentQuestion: null,
        selected: null
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
      game = new Game()
      this.currentQuestion = game.nextQuestion()
    },

    methods: {
      handlePick (item) {
        this.selected = item.questionId
      },
      handleSubmit () {
        game.submitAnswer(this.selected)
        this.currentQuestion = game.nextQuestion()
        this.selected = null
      }
    }
  }
</script>
