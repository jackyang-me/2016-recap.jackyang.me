<style>
  .c-circleSplitWrapper {
    position: relative;
    margin: 10px;
    padding-top: 10px;
  }
  .c-circleSplit__originImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-leave-active {
    transition: opacity 0;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

<template>
  <div class="c-circleSplitWrapper">
    <div ref="cs"></div>
    <transition name="fade">
      <div class="c-circleSplit__originImage" v-show="reveal" :style="{backgroundImage: backgroundImage}" >
    </transition>
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
      },
      reveal: Boolean
    },

    watch: {
      question (value) {
        value && this.updateImage(value.image)
      }
    },

    computed: {
      backgroundImage () {
        return this.question ? 'url(' + this.question.image + ')' : ''
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
