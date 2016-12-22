<style>
  .c-circleSplitWrapper {
    margin: 10px;
    padding-top: 10px;
  }
  .c-circleSplitWrapper canvas {
    border-radius: 50%;
  }
</style>

<template>
  <div class="c-circleSplitWrapper">
    <div ref="cs"></div>
  </div>
</template>

<script>
  import CircleSplit from 'circle-split'

  export default {
    circleSplit: null,

    props: {
      question: {
        type: Object,
        default () {
          return {}
        }
      }
    },

    watch: {
      question (value) {
        value && this.updateImage(value.image)
      }
    },

    mounted () {
      this.initCircleSplit()
    },

    destroyed () {
      this.$options.circleSplit.destroy()
    },

    methods: {
      initCircleSplit () {
        this.$options.circleSplit = new CircleSplit(this.$refs.cs, {
          minDiameter: 2,
          size: this.$el.clientWidth,
          imageCenterType: 'cover'
        })
        this.$options.circleSplit
      },
      updateImage (image) {
        if (this.$options.circleSplit) {
          this.$options.circleSplit.setImage(image)
        } else {
          console.warn('circleSplit is not initiated yet')
        }
      }
    }
  }
</script>
