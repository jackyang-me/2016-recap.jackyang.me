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
  .c-endPage__words {}
</style>

<template>
  <div class="c-endPage">
    <div class="c-endPage__comment">
      {{result === 'good' ? '厉害了，word哥' : '还需努力啊'}}，你正确“看清”了{{correctCount}}件大事件。{{comment || '你的眼睛就是为看马赛克而生的！'}}
    </div>
    <h4 class="c-endPage__words">在过去的一年，你又有多少自己的“大事件”呢？整理2016，只为更好的踏上2017新的旅程。</h4>
    <p class="c-endPage__hit">如果喜欢，请不忘分享哦</p>
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
        showShare: false
      }
    },

    computed: {
      comment () {
        let result = this.correctCount > 10 ? 'good' : 'bad'
        if (result) {
          let classification = COMMENTS[result]
          let index = random(0, classification.length - 1)
          return classification[index]
        } else {
          return ''
        }
      }
    }
  }
</script>
