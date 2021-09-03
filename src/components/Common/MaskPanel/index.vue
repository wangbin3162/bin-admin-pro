<template>
  <div class="disable-modify-mask" :title="title" :style="customStyles"></div>
</template>

<script>
export default {
  name: 'MaskPanel',
  props: {
    title: {
      type: String,
      default: '不可编辑',
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    theme: {
      type: String,
      validate: (val) => ['light', 'dark'].includes(val),
      default: 'light',
    },
    opacity: {
      type: Number,
      default: 0.2,
    },
  },
  computed: {
    customStyles() {
      return {
        zIndex: this.zIndex,
        background: { light: '#ffffff', dark: '#000000' }[this.theme],
        opacity: this.opacity,
      }
    },
  },
}
</script>

<style scoped lang="stylus">
.disable-modify-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
}
</style>
