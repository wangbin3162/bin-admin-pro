<template>
  <b-card class="app-item" :style="styles" :body-style="{padding:0}" shadow="never">
    <div class="p16">
      <div flex="cross:center">
        <img :src="item.avatar" class="avatar-img" alt="">
        <div class="item-title">{{ item.title }}</div>
      </div>
    </div>
    <div>
      <div class="item-author">作者：{{ item.author }}</div>
      <div class="item-desc">最后更新时间：{{ item.time }}</div>
    </div>
    <div class="item-extra">
      <slot name="extra">
        <b-row>
          <b-col span="6">
            <b-tooltip content="访问官网">
              <a :href="item.url" target="_blank">
                <b-icon name="link"></b-icon>
              </a>
            </b-tooltip>
          </b-col>
          <b-col span="6">
            <b-tooltip content="下载">
              <b-icon name="cloud-download"></b-icon>
            </b-tooltip>
          </b-col>
          <b-col span="6">
            <b-tooltip content="编辑">
              <b-icon name="edit"></b-icon>
            </b-tooltip>
          </b-col>
          <b-col span="6">
            <b-tooltip content="提示">
              <b-icon name="question"></b-icon>
            </b-tooltip>
          </b-col>
        </b-row>
      </slot>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'AppItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    styles: {
      type: Object
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.app-item {
  display: inline-block;
  width: 48%;
  margin: 0 16px 16px 0;
  .avatar-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .item-title {
    font-weight: 600;
    color: $color-text-primary;
    margin-left: 6px;
  }
  .item-desc, .item-author {
    color: $color-text-default;
    padding: 0 24px;
    margin-bottom: 6px;
  }
  .item-extra {
    margin-top: 16px;
    border-top: 1px solid #f0f0f0;
    padding: 8px 0;
    text-align: center;
    :deep(.bin-col) {
      border-right: 1px solid #e8eaec;
    }
    :deep(.bin-col:last-child) {
      border-right: none;
    }
    i {
      font-size: 20px;
      cursor: pointer;
      line-height: 32px;
    }
    a {
      display: inline-block;
      line-height: 32px;
      color: $color-text-default;
    }
  }
}
</style>
