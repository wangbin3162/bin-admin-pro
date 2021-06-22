<template>
  <div class="global-header-trigger" @click="$emit('click')">
    <i :class="`b-iconfont b-icon-${icon}`" :style="{transform: `rotate(${rotate}deg)`}"></i>
  </div>
</template>

<script>
export default {
  name: 'HeaderTrigger',
  props: {
    icon: {
      type: String
    },
    rotate: {
      type: Number
    }
  },
  emits: ['click']
}
</script>
