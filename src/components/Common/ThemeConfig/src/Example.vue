<template>
  <div class="style-example-container">
    <div class="inner">
      <div class="top" :style="{ background: topColor }"></div>
      <div class="left" :style="{ background: leftColor }"></div>
      <div class="right" :style="{ background: rightColor }"></div>
    </div>
    <div class="label" style="font-size: 12px; text-align: center">{{ label }}</div>

    <i class="b-iconfont b-icon-check"></i>
    <div class="primary-color" :style="{ background: primaryColor }"></div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  topColor: {
    type: String,
    default: '#fff',
  },
  leftColor: {
    type: String,
    default: '#000',
  },
  rightColor: {
    type: String,
    default: '#F5F5F5',
  },
  primaryColor: {
    type: String,
    default: 'var(--bin-color-primary)',
  },
})
</script>

<style scoped>
.style-example-container {
  --s-radius: 4px;
  position: relative;
  width: 50px;
  cursor: pointer;

  .inner {
    display: flex;
    flex-wrap: wrap;
    height: 40px;
    border-radius: var(--s-radius);
    background-color: transparent;
    box-shadow: 0 2px 4px #0000001f, 0 0 6px #0000000a;
    .top {
      border-top-left-radius: var(--s-radius);
      border-top-right-radius: var(--s-radius);
      width: 100%;
      height: 20%;
      background-color: #fff;
    }
    .left {
      border-bottom-left-radius: var(--s-radius);
      width: 30%;
      height: 80%;
      background-color: #000;
    }
    .right {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      width: 70%;
      height: 80%;
      background-color: #f5f5f5;
    }
  }
  .label {
    width: 100%;
    line-height: 24px;
  }
  .primary-color {
    position: absolute;
    left: 2px;
    top: 10px;
    width: 10px;
    height: 5px;
    border-radius: 2px;
  }
  > i.b-icon-check {
    position: absolute;
    right: 2px;
    bottom: 24px;
    color: var(--bin-color-primary);
    opacity: 0;
  }
  &.active {
    > i.b-icon-check {
      opacity: 1;
    }
  }
}
</style>
