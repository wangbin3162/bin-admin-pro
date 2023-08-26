<template>
  <b-tooltip :content="tooltip" :disabled="!tooltip">
    <div class="header-trigger" @click="$emit('click')">
      <div class="trigger">
        <i
          :class="`b-iconfont b-icon-${icon}`"
          :style="{ transform: `rotate(${rotate}deg)`, fontSize: size, height: size }"
        ></i>
      </div>
    </div>
  </b-tooltip>
</template>

<script setup>
defineEmits(['click'])
defineProps({
  icon: {
    type: String,
  },
  rotate: {
    type: Number,
  },
  size: {
    type: String,
  },
  tooltip: String,
})
</script>
