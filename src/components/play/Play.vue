<style>
  .c-pageHeader {
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: rgba(255,255,255,.2);
    color: rgba(0,0,0,.8);
    text-align: center;
    z-index: 2;
  }
  .c-pageHeader.correct {
    color: rgba(255,255,255,.8);
    background-color: lightseagreen;
  }
  .c-pageHeader.incorrect {
    color: rgba(255,255,255,.8);
    background-color: red;
  }
  .c-pageMain {
    margin-top: 45px;
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
  .c-playPage__canvasBackground {
    position: absolute;
  }
</style>

<template>
  <div class="c-playPage">
    <div class="c-pageHeader">
      {{index}}/{{total}}
    </div>
    <div class="c-pageMain">
      <circle-split :question="currentQuestion" :reveal="showOriginImage"></circle-split>
      <answer-picker v-if="currentQuestion"
                     :question="currentQuestion"
                     :selected="selected"
                     @pick="handlePickAnswer"></answer-picker>
    </div>
    <div class="c-playPage__loading">
    </div>
    <div class="c-pageFooter">
      <button @click="handleSubmit" class="c-pageFooter__submit">Submit</button>
    </div>
    <div class="c-playPage__background">
      <transition name="fade">
        <canvas class="c-playPage__canvasBackground" ref="backgroundCanvas" :v-show="showBackground"></canvas>
      </transition>
    </div>
  </div>
</template>

<script>
  import CenterIt from 'center-it'
  import stackblur from 'stackblur-canvas'
  import CircleSplit from './CircleSplit.vue'
  import AnswerPicker from './AnswerPicker.vue'

  const gameTotalTime = 60

  function blurImage (imageSrc, targetCanvas, blurRadius, blurAlphaChannel) {
    let image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = function () {
      let centerIt
      stackblur.image(image, targetCanvas, blurRadius, blurAlphaChannel)
      centerIt = new CenterIt({
        containerWidth: window.screen.availWidth,
        containerHeight: window.screen.availHeight,
        originWidth: targetCanvas.width,
        originHeight: targetCanvas.height,
        centerType: 'cover'
      })
      targetCanvas.style.width = centerIt.width() + 'px'
      targetCanvas.style.height = centerIt.height() + 'px'
      targetCanvas.style.top = centerIt.offset().top + 'px'
      targetCanvas.style.left = centerIt.offset().left + 'px'
    }
    image.src = imageSrc + '?imageView2/2/w/100'
  }

  export default {
    components: {
      'circle-split': CircleSplit,
      'answer-picker': AnswerPicker
    },

    data () {
      return {
        currentQuestion: null,
        selected: null,
        time: gameTotalTime,
        showOriginImage: false,
        backgroundColor: '#efefef',
        showBackground: false,
        index: 0,
        total: 0
      }
    },

    computed: {
      ct () {
        if (this.selected !== null && this.selected === this.currentQuestion.id) {
          return true
        } else if (this.selected !== null && this.selected !== this.currentQuestion.id) {
          return false
        } else {
          return null
        }
      }
    },

    watch: {
      currentQuestion (value) {
        console.log('question change', value)

        if (value && value.image) {
          fetch(value.image + '?imageAve', {method: 'GET'})
            .then(response => response.json())
            .then(response => {
              this.backgroundColor = '#' + response.RGB.substring(2)
            })

          this.updateBackgroundCanvas(value.image)
        }
      }
    },

    mounted () {
      let that = this

      game = new Game({
        onDataLoaded () {
          game.start()
          that.currentQuestion = game.currentQuestion()
          that.index ++
          that.total = game.questions.length
        }
      })

      this.initBackgroundCanvas()
    },

    methods: {
      handlePickAnswer (item) {
        this.selected = item.key
        this.showOriginImage = true
        game.submitAnswer(this.selected)

        // document.body.scrollTop = 0

        setTimeout(() => {
          this.currentQuestion = game.nextQuestion()
          this.selected = null
          this.showOriginImage = false
          this.index ++
        }, 2000)
      },
      handleSubmit () {
        console.log('submit')
      },
      initBackgroundCanvas () {
        let canvas = this.$refs.backgroundCanvas
        canvas.width = window.screen.availWidth
        canvas.height = window.screen.availHeight
      },
      updateBackgroundCanvas (imageSrc) {
        let canvas = this.$refs.backgroundCanvas
        blurImage(imageSrc, canvas, 20, .5)
      }
    }
  }
</script>
