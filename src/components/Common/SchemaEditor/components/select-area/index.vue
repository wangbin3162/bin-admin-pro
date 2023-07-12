<template>
  <div
    v-show="showArea"
    :style="{
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="select-area"
  />
</template>

<script setup>
defineProps({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  showArea: Boolean,
})
</script>

<style lang="stylus" scoped>
.select-area {
  position: absolute;
  border: 1px solid #0e7be6;
  background-color: rgba(14, 123, 230, 0.38);
}
</style>
