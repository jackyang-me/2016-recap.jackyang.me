<style>
  .c-answerPicker {
    list-style: none;
    margin: 0 10px;
    padding: 0;
  }
  .c-answerItem {
    padding: 10px;
    margin-bottom: 5px;
    border: 1px dashed lightgrey;
  }
  .c-answerItem.is-selected {
    background-color: lightseagreen;
  }
</style>

<template>
  <ul class="c-answerPicker">
    <li v-for="item in answers"
        :class="{'c-answerItem': true, 'is-selected': selected === item.key}"
        @click="pickAnswer(item)">
      {{item.value}}
    </li>
  </div>
</template>

<script>
  export default {
    props: {
      answers: {
        type: Array, // {key, value}
        default () {
          return []
        }
      },
      selected: [Number, String]
    },

    methods: {
      pickAnswer (item) {
        console.log('tap', item.value)
        this.$emit('pick', item)
      }
    }
  }
</script>
