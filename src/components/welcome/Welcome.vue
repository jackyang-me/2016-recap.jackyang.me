<style>
  .c-welcomePage__titleWrapper {
    position: absolute;
    top: 16%;
    width: 100%;
    margin: 0 auto;
  }
  .c-welcomePage__title {
    font-family: inherit;
    font-size: 100px;
    text-align: center;
    margin: 0;
    color: rgba(255,255,255,.8);
  }
  .c-welcomePage__title span {
    color: #ff426e;
    font-weight: 100;
  }
  .c-welcomePage__subtitle {
    margin: -20px 20px 0 0;
    font-weight: bold;
    text-align: right;
    color: rgba(255,255,255,.6);
  }
  .c-startBtnWrapper {
    position: absolute;
    bottom: 50px;
    text-align: center;
    width: 100%;
  }
  .c-startBtn {
    display: block;
    width: 50%;
    height: 50px;
    margin: 20px auto;
    border-radius: 25px;
    border: none;
    background-color: #ff426e;
    color: rgba(255,255,255,.8);
    outline: none;
    font-size: 18px;
    box-shadow: 1px 2px 2px rgba(0,0,0,.2);
  }
  .c-welcomePage__tip {
    position: absolute;
    top: 40%;
    color: #fff;
    margin: 40px;
    text-align: center;
  }
  .c-welcomePage__instruction {
    font-size: 12px;
    color: rgba(255,255,255,.6);
  }

  .slideIn-enter-active, .slideIn-leave-active {
    transform: translateY(0);
    opacity: 1;
    transition: all .5s ease;
  }
  .slideIn-enter, .slideIn-leave-active {
    transform: translateY(-100%);
    opacity: 0
  }

  .scaleIn-enter-active, .scaleIn-leave-active {
    transform: scale(1,1);
    opacity: 1;
    transition: all .5s ease;
  }
  .scaleIn-enter, .scaleIn-leave-active {
    transform: scale(.3,.3);
    opacity: 0
  }

  .c-welcomePage__background canvas {
    position: fixed;
    z-index: -1;
  }
</style>

<template>
  <div class="c-welcomePage">
    <transition name="slideIn">
      <div class="c-welcomePage__titleWrapper" v-show="showTitle">
        <h1 class="c-welcomePage__title">20<span>16</span></h1>
        <p class="c-welcomePage__subtitle">RECAP</p>
      </div>
    </transition>
    <transition name="slideIn">
      <div class="c-welcomePage__tip" v-show="showTip">
        <p>即将过去的2016年，发生了很多“大事件”，你还记得多少呢？</p>
        <p class="c-welcomePage__instruction">玩法：通过在彩色<b>圆斑</b>上滑动手指来看清图片，选择下方对图片正确的描述。</p>
      </div>

    </transition>
    <div class="c-startBtnWrapper">
      <transition name="scaleIn">
        <button class="c-startBtn" v-show="showStartButton" @click="start">START</button>
      </transition>
    </div>
    <div class="c-welcomePage__background">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import stackblur from 'stackblur-canvas'
  import CenterIt from 'center-it'

  export default {
    data () {
      return {
        showTitle: false,
        showTip: false,
        showStartButton: false
      }
    },

    mounted () {
      this.loadBackground()
      setTimeout(() => this.showTitle = true, 500)
      setTimeout(() => this.showTip = true, 1000)
      setTimeout(() => this.showStartButton = true, 1500)
    },

    methods: {
      start () {
        setTimeout(() => this.showTitle = false, 100)
        setTimeout(() => this.showTip = false, 600)
        setTimeout(() => {
          this.showStartButton = false
          this.$emit('start')
        }, 1100)
      },
      loadBackground () {
        let image = new Image()
        let targetCanvas = this.$refs.canvas

        image.crossOrigin = 'anonymous'
        image.onload = function () {
          let centerIt

          stackblur.image(image, targetCanvas, 5, 1)
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
        image.src = 'http://oikxjcmez.bkt.clouddn.com/event/image/wallpaper1_1x.jpg?imageView2/2/w/100'
      }
    }
  }
</script>
