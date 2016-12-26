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
  .c-endPage__2016 {
    
  }
  .c-endPage__2017 {

  }
</style>

<template>
  <div class="c-endPage">
    <div class="c-endPage__comment">{{comment || '你的眼睛就是为看马赛克而生的！'}}</div>
    <h4 class="c-endPage__2016">别了，2016</h4>
    <p class="c-endPage__2017">期待2017年的精彩</p>
    <p class="c-endPage__hit">如果觉得有趣，请不忘分享哦</p>
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
      result: String
    },
    computed: {
      comment () {
        if (this.result) {
          let classification = COMMENTS[this.result]
          let index = random(0, classification.length - 1)
          return classification[index]
        } else {
          return ''
        }
      }
    }
  }
</script>
