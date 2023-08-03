<template>
  <div class="demo-wrap">
    <div ref="containerRef">demo2</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const containerRef = ref(null)

onMounted(() => {
  console.log(containerRef.value)
})
</script>

<style lang="stylus" scoped></style>
