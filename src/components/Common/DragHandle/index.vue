<template>
  <div class="handle" :class="customClass" :style="styles" title="Drag sort">
    <img v-if="type==='svg'" :src="svgImg[icon]" alt="move"/>
    <i v-else :class="`b-iconfont b-icon-${icon}`" :style="{fontSize:iconFontSize}"></i>
  </div>
</template>

<script>
export default {
  name: 'drag-handle',
  props: {
    customClass: {
      type: String,
      default: 'drag'
    },
    type: {
      type: String,
      default: 'svg' // svg icon
    },
    icon: {
      type: String,
      default: 'drag-move'
    },
    iconFontSize: {
      type: String
    },
    styles: {
      type: Object
    }
  },
  data() {
    return {
      svgImg: {
        'drag-move': require('./drag-move.svg'),
        'drag-move0': require('./drag-move0.svg'),
        'drag-move1': require('./drag-move1.svg'),
        'drag-move2': require('./drag-move2.svg'),
        'drag-move3': require('./drag-move3.svg'),
        'drag-move-fill': require('./drag-move-fill.svg'),
        'drag-drop-line': require('./drag-drop-line.svg'),
        'drag-filled': require('./drag-filled.svg'),
        'drag-flat': require('./drag-flat.svg'),
        'gesture_drag-up-down': require('./gesture_drag-up-down.svg')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.handle {
  cursor: grab;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 0;
  > img {
    width: 100%;
    opacity: 0.7;
    transition: .2s;
    &:hover {
      opacity: 1;
    }
  }
  > i {
    opacity: 0.8;
    transition: .2s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
