<template>
  <div class="title-wrap" :class="{'no-border':noBorder}">
    <div class="title" :class="`tip-${tipPos}`" :style="titleStyle">
      <slot><span>{{ title }}</span></slot>
    </div>
    <div class="right" v-if="$slots.default">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    titleStyle: { type: Object },
    tipPos: {
      type: String,
      validator(value) {
        return ['bottom', 'left'].includes(value)
      },
      default: 'bottom'
    },
    noBorder: Boolean
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/mixins.styl"
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  color: #333333;
  background: #fff;
  &.no-border {
    border-bottom: none;
  }

  > .title {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding: 10px 12px;
    &:after {
      content: '';
      position: absolute;
      background-color: getColor();
    }

    &.tip-left {
      &:after {
        left: 0;
        top: 12px;
        bottom: 12px;
        width: 2px;
      }
    }

    &.tip-bottom {
      &:after {
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
      }
    }

    span {
      display: inline-block;
      vertical-align: baseline;
    }
  }
}
</style>
