<template>
  <div class="icon-wrapper" :style="styles" @click="handleClick">
    <i :class="`b-iconfont b-icon-${icon}`"></i>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Utils } from 'bin-ui-design'
import { themeConfigRef } from '@/theme'

const { mixWhite } = Utils.color

export default {
  name: 'Iconfont',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: Number,
      default: 28,
    },
    bg: Boolean,
    round: Boolean,
    type: String,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const colorVar = computed(() => {
      const color = props.color
      if (!color) return null
      const colorMap = {
        primary: themeConfigRef.value.binColorPrimary,
        success: themeConfigRef.value.binColorSuccess,
        warning: themeConfigRef.value.binColorWarning,
        danger: themeConfigRef.value.binColorDanger,
        info: '#35495E',
      }
      return colorMap[color] ? colorMap[color] : color
    })
    const bgVar = computed(() => {
      const color = colorVar.value
      if (!color || !props.bg) return null
      return mixWhite(color, 0.95)
    })

    const styles = computed(() => {
      const size = props.size
      const iconSize = size / 2 + 2
      return {
        cursor: props.type === 'btn' ? 'pointer' : null,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${iconSize}px`,
        color: colorVar.value,
        backgroundColor: bgVar.value,
        borderRadius: props.round ? '50%' : '2px',
      }
    })

    function handleClick() {
      if (props.type === 'btn') {
        emit('click', props.icon)
      }
    }

    return {
      colorVar,
      bgVar,
      styles,
      handleClick,
    }
  },
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  .b-iconfont {
    font-size: inherit;
  }
  + .icon-wrapper {
    margin-left: 8px;
  }
}
</style>
