<template>
  <div v-if="dev" ref="domRef" class="dev-click-pos-wrapper" @click="consoleClickPos">
    <slot></slot>
  </div>
  <slot v-else></slot>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'DevPos',
  props: {
    dev: {
      type: Boolean,
    },
  },
  emits: ['dev-pos'],
  setup(props, { emit }) {
    const domRef = ref(null)
    function consoleClickPos({ offsetX, offsetY }) {
      if (!props.dev) return
      const target = domRef.value
      const width = target ? target.clientWidth : 0
      const height = target ? target.clientHeight : 0

      const relativeX = +(offsetX / width).toFixed(2)
      const relativeY = +(offsetY / height).toFixed(2)

      emit('dev-pos', [offsetX, offsetY], [relativeX, relativeY])

      console.warn(
        `dev-pos: \n Click Position is [${offsetX}, ${offsetY}] \n Relative Position is [${relativeX}, ${relativeY}]`,
      )
    }
    return {
      domRef,
      consoleClickPos,
    }
  },
}
</script>

<style lang="stylus" scoped>
.dev-click-pos-wrapper {
  position: relative;
  font-size: 0;
}
</style>
