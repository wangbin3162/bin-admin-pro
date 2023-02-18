<template>
  <div @click="toggle">
    <svg viewBox="0 0 1000 600">
      <title>Animated clip-path SVG</title>
      <defs>
        <clipPath id="cd-image-1">
          <circle id="cd-circle-1" cx="580" cy="75" r="60" ref="clipPathRef" />
        </clipPath>
      </defs>
      <image
        width="1000px"
        height="600px"
        clip-path="url(#cd-image-1)"
        xlink:href="@/assets/images/banner/banner2.jpeg"
      ></image>
    </svg>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'

const visible = ref(false)
const clipPathRef = ref(null)

let animate
onMounted(() => {
  clipPathRef.value.style.r = 60
  animate = gsap.to(clipPathRef.value.style, {
    r: 964,
    duration: 0.3,
    ease: 'power1.inOut',
  })
  animate.pause()
})

function toggle() {
  visible.value = !visible.value
  if (visible.value) {
    animate.play()
  } else {
    animate.reverse()
  }
}
</script>

<style lang="stylus" scoped></style>
