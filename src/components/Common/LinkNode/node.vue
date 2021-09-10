<template>
  <div class="link-node">
    <div class="link-node-title" style="height: 28px; padding: 5px 8px;">
      <i class="link-node-icon" :class="`b-iconfont b-icon-${data.icon||defaultIcon}`"></i>
      <div class="link-node-name">{{ data.title }}</div>
      <div class="link-node-handle" v-if="$slots.action">
        <slot name="action">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'link-node',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultIcon: {
      type: String,
      default: 'table',
    },
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.link-node {
  position: absolute;
  background: #fff;
  color: #000;
  cursor: pointer;
  padding: 1px 1px 1px 0;
  border-left: 2px solid getColor();
  width: 180px;
  height: 30px;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    overflow: hidden;
  }
  &-icon {
    flex-shrink: 0;
    width: 16px;
    font-size: 16px;
    color: getColor();
  }
  &-handle {
    flex-shrink: 0;
    display: flex;
    width: 16px;
    cursor: pointer;
    :deep(.b-iconfont) {
      outline: none;
      font-size: 16px;
    }
  }
  .link-node-name {
    flex: 1;
    padding: 0 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
  }
  &:hover {
    padding: 0;
    border: 1px solid getColor();
    border-left: 2px solid getColor();
  }
}
</style>
