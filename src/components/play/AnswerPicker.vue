<style>
  .c-answerPicker {
    position: relative;
    overflow-x: hidden;
  }
  .c-answerList {
    width: 100%;
    height: auto;
    margin-top: 10px;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    list-style: none;
  }
  .c-answerItem {
    color: rgba(255,255,255,.8);
    background-color: rgba(255,255,255,.3);
    padding: 20px;
    margin-bottom: 1px;
  }
  .c-answerItem.is-selected {
    background-color: rgba(255,255,255,1);
  }
  .c-answerResult {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 10px 10px 20px 10px;
    box-sizing: border-box;
  }
  .c-answerResult__result {
    margin: 0 0 10px 0;
    font-size: 14px;
    font-weight: 100;
    color: rgba(255,255,255,.9);
  }
  .c-answerResult__summary {
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
    padding-bottom: 20px;
    margin: 0 -10px;
  }
  .c-answerResult__title {
    margin: 5px 0;
  }
  .c-answerResult__desc {
    margin: 0;
    color: rgba(0,0,0,.8);
  }

  .c-arrow {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid rgba(255,255,255,.7);
    border-top: 1px solid rgba(255,255,255,.7);
    transform: rotateZ(45deg);
    float: right;
    margin-top: 5px;
  }
  .c-nextBtn {
    display: block;
    width: 80%;
    height: 50px;
    margin: 20px auto;
    border-radius: 25px;
    border: none;
    background-color: #ff426e;
    color: rgba(255,255,255,.8);
    outline: none;
  }
  .listTransition-enter-active, .listTransition-leave-active {
    transform: translateX(0);
    opacity: 1;
    transition: all .3s ease;
  }
  .listTransition-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .listTransition-leave-active {
    opacity: 0;
    transform: translateX(-100%);
  }

  .resultTransition-enter-active, .resultTransition-leave-active {
    transform: scale(1, 1);
    opacity: 1;
    transition: all .3s ease;
    transition-delay: .2s;
  }
  .resultTransition-enter, .resultTransition-leave-active {
    opacity: 0;
    transform: scale(0, 0);
  }
</style>

<template>
  <div class="c-answerPicker">
    <transition name="listTransition">
      <ul class='c-answerList' v-show="!selected">
        <li v-for="item in answers"
            :class="{'c-answerItem': true, 'is-selected': selected === item.key}"
            @click="handlePickAnswer(item)">
          {{item.value}}
          <span class="c-arrow"></span>
        </li>
      </ul>
    </transition>
    <transition name="resultTransition">
      <div class="c-answerResult" v-show="!!selected">
        <h4 class="c-answerResult__result">{{selected === question.id ? '正确' : '错误，应该是'}}</h4>
        <div class="c-answerResult__summary">
          <h4 class="c-answerResult__title">{{question.answer}}</h4>
          <p class="c-answerResult__desc">{{question.description}}</p>
        </div>
        <button class="c-nextBtn" @click="handleClickNext">NEXT</button>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      selected: String,
      question: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    computed: {
      answers () {
        if (this.question && this.question.selection) {
          return this.question.selection.map(a => {
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

    methods: {
      handlePickAnswer (item) {
        this.$emit('pick', item)
      },
      handleClickNext () {
        this.$emit('next')
      }
    }
  }
</script>
