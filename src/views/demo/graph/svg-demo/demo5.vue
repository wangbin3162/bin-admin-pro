<template>
  <div class="line-draw">
    <svg x="0px" y="0px" viewBox="0 0 300 200">
      <path class="letter-i" d="M82.4,127.1V75.6h6.8v51.5H82.4z" stroke="none" fill="none" />
      <path
        class="letter-s"
        d="M98.9,110.6l6.4-0.6c0.3,2.6,1,4.7,2.1,6.3s2.8,3,5.2,4s5,1.5,7.9,1.5c2.6,0,4.9-0.4,6.9-1.2
		s3.5-1.8,4.4-3.2s1.5-2.8,1.5-4.4c0-1.6-0.5-3-1.4-4.2s-2.5-2.2-4.6-3c-1.4-0.5-4.4-1.4-9.2-2.5s-8.1-2.2-9.9-3.2
		c-2.5-1.3-4.3-2.9-5.5-4.8c-1.2-1.9-1.8-4-1.8-6.4c0-2.6,0.7-5,2.2-7.3c1.5-2.3,3.6-4,6.5-5.2c2.8-1.2,6-1.8,9.5-1.8
		c3.8,0,7.2,0.6,10.1,1.8s5.2,3,6.7,5.4s2.4,5.1,2.5,8.1l-6.5,0.5c-0.4-3.3-1.5-5.7-3.6-7.4c-2-1.7-5-2.5-9-2.5
		c-4.1,0-7.1,0.8-9,2.3s-2.8,3.3-2.8,5.5c0,1.9,0.7,3.4,2,4.6c1.3,1.2,4.7,2.4,10.3,3.7c5.5,1.3,9.3,2.4,11.4,3.3
		c3,1.4,5.2,3.1,6.6,5.3s2.1,4.6,2.1,7.3c0,2.7-0.8,5.3-2.4,7.8s-3.8,4.3-6.8,5.7s-6.3,2-9.9,2c-4.7,0-8.6-0.7-11.7-2
		c-3.2-1.4-5.6-3.4-7.4-6.1C99.9,117.1,99,114,98.9,110.6z"
        stroke="none"
        fill="none"
      />
      <path
        class="letter-u"
        d="M183.1,75.6h6.8v29.8c0,5.2-0.6,9.3-1.8,12.3s-3.3,5.5-6.3,7.4s-7.1,2.9-12,2.9c-4.8,0-8.8-0.8-11.8-2.5
		s-5.3-4.1-6.6-7.2s-2-7.5-2-12.9V75.6h6.8v29.7c0,4.5,0.4,7.8,1.2,9.9s2.3,3.8,4.3,4.9s4.5,1.7,7.4,1.7c5,0,8.6-1.1,10.7-3.4
		s3.2-6.6,3.2-13.1V75.6z"
        stroke="none"
        fill="none"
      />
      <path
        class="letter-x"
        d="M196,127.1l19.9-26.9l-17.6-24.7h8.1l9.4,13.2c1.9,2.7,3.3,4.9,4.1,6.3c1.1-1.9,2.5-3.8,4.1-5.9l10.4-13.7
		h7.4l-18.1,24.3l19.5,27.2h-8.4l-13-18.4c-0.7-1.1-1.5-2.2-2.2-3.4c-1.1,1.9-2,3.2-2.5,3.9l-12.9,18H196z"
        stroke="none"
        fill="none"
      />
    </svg>
    <b-button type="primary" class="play-drawing" @click="click">isux</b-button>
  </div>
</template>

<script setup>
import anime from 'animejs/lib/anime.es'
import { onMounted } from 'vue'
let lineDrawing
function click() {
  lineDrawing.restart()
}

onMounted(() => {
  let letterTime = 2000
  lineDrawing = anime({
    targets: 'path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutCubic',
    duration: letterTime,
    delay: function (el, i) {
      return letterTime * i
    },
    begin: function (anim) {
      let letters = document.querySelectorAll('path')
      for (let i = 0; i < letters.length; ++i) {
        letters[i].setAttribute('stroke', '#fff')
        letters[i].setAttribute('fill', 'none')
      }
    },
    update: function (anim) {
      if (anim.currentTime >= 2 * letterTime) {
        document.querySelector('.letter-i').setAttribute('fill', '#fff')
      }
      if (anim.currentTime >= 3 * letterTime) {
        document.querySelector('.letter-s').setAttribute('fill', '#fff')
      }
      if (anim.currentTime >= 4 * letterTime) {
        document.querySelector('.letter-u').setAttribute('fill', '#fff')
      }
      if (anim.currentTime >= 5 * letterTime) {
        document.querySelector('.letter-x').setAttribute('fill', '#fff')
      }
    },

    autoplay: false,
  })
})
</script>

<style lang="stylus" scoped>
.line-draw {
  display: flex;
  background-color: #000;
  position: relative;
  width:600px;
  height: 400px;
  text-align:center;
}

svg {
   width: 600px;
   height: 400px;
   padding: 10px;
}
</style>
