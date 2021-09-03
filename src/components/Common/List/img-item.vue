<template>
  <b-card class="image-item" :body-style="{padding:0}">
    <a :href="item.url" target="_blank">
      <img :src="item.banner" alt="">
      <div class="p8">
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">一套基于 Vue.js 的企业级 UI 组件库，内含 50+ 常用基础组件</div>
        <div class="item-extra">
          <span class="item-time">{{ item.time }}</span>
          <img :src="item.avatar" alt="">
        </div>
      </div>
    </a>
  </b-card>
</template>

<script>
export default {
  name: 'ImgItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.image-item {
  display: inline-block;
  width: 48%;
  margin: 0 16px 16px 0;
  img {
    width: 100%;
    height: 250px;
    border-radius: 2px 2px 0 0;
  }
  .item-title {
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 8px;
  }
  .item-desc, .item-extra {
    color: $color-text-default;
  }
  .item-time {
    color: $color-text-secondary;
  }
  .item-extra {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}
</style>
