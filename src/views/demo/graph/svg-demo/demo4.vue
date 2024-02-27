<template><div class="box"></div></template>

<script setup>
import anime from 'animejs/lib/anime.es'
import { onMounted } from 'vue'

onMounted(() => {
  anime({
    targets: '.box',
    translateX: 300,
    duration: 800,
    delay: 600,
    easing: 'easeInOutSine',
    loop: true,
  })
})
</script>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: rgb(251, 21, 90);
}
</style>
