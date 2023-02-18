<template>
  <div flex="cross:center">
    <svg x="0px" y="0px" width="300px" height="100px" viewBox="0 0 300 100" class="svg1">
      <line x1="20" y1="50" x2="200" y2="50" stroke="#000" stroke-width="1"></line>
    </svg>
    <svg
      class="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      width="52px"
      height="52px"
      viewBox="0 0 52 52"
    >
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path ref="pathRef" class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  </div>
</template>

<script setup>
// import { onMounted, ref } from 'vue'
// const pathRef = ref(null)
// onMounted(() => {
//   let length = pathRef.value.getTotalLength()
//   console.log(length)
// })
</script>

<style lang="stylus" scoped>

.svg1 line {
  stroke-dasharray:300,300;
  stroke-dashoffset:300;
  animation: move 2s ease-in-out infinite forwards;
}

@keyframes move {
  0% {
    stroke-dashoffset:300;
  }
  100% {
    stroke-dashoffset:0;
  }
}
.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  margin: 16px;
  box-shadow: inset 0px 0px 0px #7ac142;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
</style>
