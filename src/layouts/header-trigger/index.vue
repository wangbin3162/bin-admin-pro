<template>
  <div class="global-header-trigger" @click="$emit('click')">
    <i :class="`b-iconfont b-icon-${icon}`"></i>
  </div>
</template>

<script>
export default {
  name: 'HeaderTrigger',
  props: {
    icon: {
      type: String
    }
  },
  emits: ['click']
}
</script>

<style scoped lang="stylus">
.global-header-trigger {
  display: flex;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;
  transition: background-color .2s;
  .b-iconfont {
    font-size: 18px;
    color: rgba(0, 0, 0, .85);
  }
  &:hover {
    background-color: #f6f6f6;
  }
  &.light {
    &:hover {
      background-color: #f6f6f6;
    }
  }
}
</style>
