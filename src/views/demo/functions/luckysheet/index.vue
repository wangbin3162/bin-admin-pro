<template>
  <page-wrapper>
    <b-button>表格编辑</b-button>

    <div class="sheet-wrapper">
      <div id="luckysheet"></div>
    </div>
  </page-wrapper>
</template>

<script setup>
import { onMounted } from 'vue'

// @ts-ignore
defineOptions({
  name: 'FuncLuckysheet',
})

onMounted(() => {
  // @ts-ignore
  console.log(window.luckysheet)
  // @ts-ignore
  // eslint-disable-next-line no-undef
  luckysheet.create({
    container: 'luckysheet',
  })
})
// @ts-ignore
</script>

<style>
.sheet-wrapper {
  position: relative;
  height: 800px;
}
#luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 30px;
  bottom: 0px;
}
</style>
