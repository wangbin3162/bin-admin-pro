<template>
  <div class="demo-wrap">
    <div class="container" id="G6Demo03"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { Message } from 'bin-ui-next'
import { getMockData } from './data'
import G6Creator from './G6Creator'

const props = defineProps({
  height: {
    type: Number,
    default: 700,
  },
})

const data = getMockData()
console.log(data)

let gc
onMounted(() => {
  gc = new G6Creator('G6Demo03', props.height)
  gc.render(data)
})

onBeforeUnmount(() => {
  if (gc) gc.destroy()
})
</script>

<style lang="stylus" scoped>
.demo-wrap {
  position: relative;
  .container {
    display: block;
    width: 100%;
    height: 700px;
  }
}
</style>
