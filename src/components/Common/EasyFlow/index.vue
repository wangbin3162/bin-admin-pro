<template>
  <div class="easy-flow" :style="{ height }">
    <div class="left-side">left-side</div>
    <div class="right-side">right-side</div>
  </div>
</template>

<script>
export default {
  name: 'EasyFlow',
}
</script>
<script setup>
const props = defineProps({
  height: {
    type: String,
    default: '100%',
  },
})
</script>

<style scoped lang="stylus">
.easy-flow {
  display: flex;
  background-color: #fff;
  .left-side {
    width: 180px;
    border-right: 1px solid #eeeeee;
  }
  .right-side {
    width: calc(100% - 180px);
    overflow: auto;
    background: url('@/assets/images/grid.svg')
    background-position: -8px 8px;
    // background: linear-gradient(to right, #f5f5f5 1px, transparent 1px),linear-gradient(to bottom, #f5f5f5 1px, transparent 1px);
    // background-size: 10px 10px;
    // background: radial-gradient(circle, #dddddd 1px, transparent 1px);
    // background-size: 10px 10px;
  }
}
</style>
