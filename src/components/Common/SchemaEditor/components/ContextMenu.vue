<template>
  <transition name="zoom-in-top">
    <div v-if="contextMenu.show" class="context-menu-wrap" :style="contextMenuStyle">
      <div class="context-menu-item" @click="toDeleteCom">
        <i class="menu-icon b-iconfont b-icon-delete"></i>
        删除
        <span class="key-code">Delete</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { contextMenu } from '../store/useSchema'
import { toDeleteCom } from '../store/useCom'

const contextMenuStyle = computed(() => {
  return {
    display: contextMenu.value.show ? 'block' : 'none',
    left: `${contextMenu.value.x + 10}px`,
    top: `${contextMenu.value.y + 10}px`,
    transform:
      document.documentElement.clientHeight - contextMenu.value.y < 250
        ? 'translate(0px, -100%)'
        : '',
  }
})
</script>

<style lang="stylus" scoped>
.context-menu-wrap {
  position: fixed;
  z-index: 9999;
  display: none;
  width: 152px;
  color: #333;
  background: #fff;
  user-select: none;
  padding: 5px 0;
  box-shadow:  0 2px 8px rgba(0,0,0,0.15);
}

.context-menu-item {
  position: relative;
  display: flex;
  height: 28px;
  padding: 0 6px;
  padding-right: 3em;
  overflow: hidden;
  line-height: 28px;
  cursor: pointer;
  border-left: 2px solid transparent;
  &:hover {
    color: #1089ff;
    background-color: #f3f9ff;
  }

  .menu-icon {
    margin-right: 4px;
  }

  .key-code {
    position: absolute;
    top: 0;
    right: 6px;
    color: #9d9d9d;
    font-size: 12px;
    transform: scale(0.9);
  }
  &.disable {
    color: #576369;
    pointer-events: none;
    cursor: auto;
  }
}

.context-menu-divider {
  width: 100%;
  height: 1px;
  background-color: #3a4659;
}
</style>
