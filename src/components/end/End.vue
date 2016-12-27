<style>
  .c-endPage__comment {
    position: absolute;
    top: 15%;
    width: 80%;
    margin: 0 auto;
    left: 10%;
    background-color: rgba(0,0,0,.4);
    color: rgba(255,255,255,.8);
    border-radius: 2px;
    box-sizing: border-box;
    padding: 20px;
  }
  .c-endPage__hit {
    position: absolute;
    bottom: 40px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: rgba(255,255,255,.8);
    text-decoration: underline;
  }
  .c-endPage__words {
    position: absolute;
    top: 40%;
    margin: 0 20px;
    text-align: center;
    color: rgba(255,255,255,.9);
    line-height: 1.5;
  }

  .slideUpIn-enter-active, .slideUpIn-leave-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 1s ease;
  }
  .slideUpIn-enter, .slideUpIn-leave-active {
    transform: translateY(60%);
    opacity: 0
  }
</style>

<template>
  <div class="c-endPage">
    <transition name="fade">
      <div class="c-endPage__comment" v-show="showComment">
        {{result === 'good' ? '厉害了，word哥' : '还需努力啊'}}，你一共“看清”了{{correctCount}}件大事件。{{comment}}
      </div>
    </transition>
    <transition name="slideUpIn">
      <h4 class="c-endPage__words" v-show="showWords">在过去的一年，你又有多少自己的“大事件”呢？整理2016，只为更好的踏上2017新的旅程</h4>
    </transition>
    <transition name="fade">
      <p class="c-endPage__hit" v-show="showShare">如果喜欢，请不忘分享哦</p>
    </transition>
  </div>
</template>

<script>
  import random from 'lodash.random'
  const COMMENTS = {
    'good': [
      '你的眼睛就是为看马赛克而生的！',
      '是不是骑兵在你眼里都是步兵？',
      '亲，你这么聪明，以后可怎么办啊？'
    ],
    'bad': [
      '你的知识储备我还是不做评价了',
      '以后上班的时候还是要多抽空看看新闻哦'
    ]
  }

  export default {
    props: {
      correctCount: Number
    },

    data () {
      return {
        showWords: false,
        showShare: false,
        showComment: false,
        result: ''
      }
    },

    computed: {
      comment () {
        let result = this.result = this.correctCount > 10 ? 'good' : 'bad'
        if (result) {
          let classification = COMMENTS[result]
          let index = random(0, classification.length - 1)
          return classification[index]
        } else {
          return ''
        }
      }
    },

    mounted () {
      setTimeout(() => this.showWords = true, 1000)
      setTimeout(() => this.showShare = true, 500)
      setTimeout(() => this.showComment = true, 500)
    }
  }
</script>
