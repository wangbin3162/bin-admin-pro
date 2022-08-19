<template>
  <div class="bin-select-dropdown" :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, inject, ref } from 'vue'
import { addResizeListener, removeResizeListener } from '@/utils/util'

export default {
  setup() {
    const select = inject('AutoInput')
    const minWidth = ref('')

    function updateMinWidth() {
      minWidth.value = select.selectWrapper?.getBoundingClientRect().width + 'px'
    }

    onMounted(() => {
      // TODO: updatePopper
      // popper.md.value.update()
      addResizeListener(select.selectWrapper, updateMinWidth)
    })

    onBeforeUnmount(() => {
      removeResizeListener(select.selectWrapper, updateMinWidth)
    })

    return {
      minWidth,
    }
  },
}
</script>
