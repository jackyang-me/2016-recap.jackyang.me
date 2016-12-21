<template>
  <div class="c-pageFooter">
    <button @click="handleClick">commit</button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick () {
        this.$emit('submit')
      }
    }
  }
</script>
