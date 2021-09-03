<template>
  <div class="list-item">
    <div class="list-item-meta">
      <div class="list-item-meta-content">
        <div class="list-item-meta-title">
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </div>
        <div class="list-item-meta-tags">
          <b-tag v-for="tag in item.tags" :key="tag">{{ tag }}</b-tag>
        </div>
      </div>
    </div>
    <div class="list-item-meta-desc" v-html="item.desc"></div>
    <div class="list-item-author">
        <span class="avatar">
          <img :src="item.avatar" alt="">
        </span> {{ item.author }} 发表于 {{ item.time }}
    </div>
    <ul class="list-item-action">
      <slot name="action">
        <li>
          <b-icon name="eye" />
          {{ item.read }}
        </li>
        <li>
          <b-icon name="heart" />
          {{ item.favour }}
        </li>
        <li>
          <b-icon name="message" />
          {{ item.remark }}
        </li>
      </slot>
    </ul>
    <div class="list-item-extra" v-if="$slots.extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
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
.list-item {
  padding 16px 0;
  border-bottom: 1px solid #e8eaec;
  &:last-child {
    border-bottom: none;
  }
  .list-item-meta {
    margin-bottom: 16px;
    &-title {
      margin-bottom: 16px;
      a {
        color: $color-text-primary;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
      }
    }
    &-desc {
      max-width: 700px;
    }
  }
  &-author {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 6px;
      img {
        width: 24px;
        height: 24%;
        border-radius: 50%;
      }
    }
  }
  &-action {
    margin-top: 16px;
    > li {
      position: relative;
      display: inline-block;
      padding: 0 16px;
      color: $color-text-secondary;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      cursor: pointer;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        &:after {
          content: unset;
        }
      }
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 14px;
        margin-top: -7px;
        background-color: #e8eaec;
      }
    }
  }
}
</style>
