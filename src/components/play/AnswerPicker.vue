<template>
  <div class="c-answerPicker">
    <div class="c-answerItem" v-for="item in answers" @click="pickAnswer(item)">
      {{item.value}}
    </div>
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
      }
    },

    data () {
      return {
        selected: null
      }
    },

    methods: {
      pickAnswer (item) {
        this.selected = item.key
        console.log('picked an answer', item)
        this.$emit('pick', item)
      }
    }
  }
</script>
