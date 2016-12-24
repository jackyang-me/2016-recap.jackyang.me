<style>
  .c-answerPicker {
    position: relative;
  }
  .c-answerList {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0 10px 20px 10px;
    box-sizing: border-box;
    list-style: none;
    transform: translateX(0);
    transition: transform .3s ease;
  }
  .c-answerItem {
    color: rgba(0,0,0,.8);
    background-color: rgba(255,255,255,.8);
    padding: 10px;
    margin-bottom: 2px;
    border-radius: 2px;
  }
  .c-answerItem.is-selected {
    background-color: rgba(255,255,255,1);
  }
  .c-answerResult {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0 10px 20px 10px;
    box-sizing: border-box;
    transform: translateX(100%);
    transition: transform .3s ease;
  }
  .c-answerResult__result {
    margin: 0 0 10px 0;
    font-size: 14px;
    font-weight: 100;
  }
  .c-answerResult__summary {
    background-color: #fff;
    border-radius: 2px;
    padding: 10px;
  }
  .c-answerResult__title {
    margin: 5px 0;
  }
  .c-answerResult__desc {
    margin: 0;
    color: rgba(0,0,0,.8);
  }

  .c-answerPicker.reveal .c-answerList {
    transform: translateX(-100%);
  }
  .c-answerPicker.reveal .c-answerResult {
    transform: translateX(0);
  }
</style>

<template>
  <div :class="{'c-answerPicker': true, 'reveal': !!selected}">
    <ul class='c-answerList'>
      <li v-for="item in answers"
          :class="{'c-answerItem': true, 'is-selected': selected === item.key}"
          @click="pickAnswer(item)">
        {{item.value}}
      </li>
    </ul>
    <div class="c-answerResult">
      <h4 class="c-answerResult__result">{{selected === question.id ? '正确' : '错误，应该是'}}</h4>
      <div class="c-answerResult__summary">
        <h4 class="c-answerResult__title">{{question.answer}}</h4>
        <p class="c-answerResult__desc">{{question.description}}</p>
      </div>
    </div>
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
      pickAnswer (item) {
        console.log('tap', item.value)
        this.$emit('pick', item)
      }
    }
  }
</script>
