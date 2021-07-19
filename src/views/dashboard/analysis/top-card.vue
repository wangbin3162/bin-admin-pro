<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '10px'}">
    <template #header>
      <div flex="main:justify cross:center">
        <span>{{ header }}</span>
        <slot name="right"></slot>
      </div>
    </template>
    <b-skeleton :loading="loading" animation>
      <template #template>
        <div>
          <b-skeleton-item variant="p" style="width: 30%;margin-bottom: 16px;"/>
          <b-skeleton-item variant="p" style="margin-bottom: 8px;"/>
          <b-skeleton-item variant="p" style="margin-bottom: 8px;"/>
          <b-skeleton-item variant="p" style="margin-bottom: 8px;"/>
          <div flex="main:justify cross:center" style="border-top:1px solid #e5e5e5;padding-top: 10px;">
            <b-skeleton-item variant="text" style="width: 10%;"/>
            <b-skeleton-item variant="text" style="width: 10%;"/>
          </div>
        </div>
      </template>
      <template #default>
        <div class="center">
          <div class="count-to" v-if="count">
            <b-count-to :start-val="0" :end-val="count"></b-count-to>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
        <div class="bottom">
          <slot name="bottom"></slot>
        </div>
      </template>
    </b-skeleton>
  </b-card>
</template>

<script>
export default {
  name: 'top-card',
  props: {
    header: String,
    loading: Boolean,
    count: {
      type: Number,
      default: 2000
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/var.styl"
.card-panel {
  .top {
    color: $color-text-default;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
  }
  .center {
    height: 100px;
    .count-to {
      color: $color-text-default;
      margin-bottom: 0;
      font-size: 28px;
      line-height: 38px;
      height: 38px;
    }
    .content {
      height: 70px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e8e8e8;
    padding-top: 9px;
    margin-top: 8px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
