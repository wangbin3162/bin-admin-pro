<template>
  <div class="base-table">
    <div class="base-table-form" v-if="$slots.filter" :style="filterStyle">
      <slot name="filter"></slot>
    </div>
    <div class="base-table-box" :style="tableStyle">
      <div class="base-table-action" v-if="$slots.action">
        <slot name="action"></slot>
      </div>
      <slot></slot>
    </div>
    <div class="base-table-pagination" v-if="$slots.page" :style="pageStyle">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    filterStyle: Object,
    tableStyle: Object,
    pageStyle: Object,
  },
}
</script>

<style scoped lang="stylus">
.base-table {
  width: 100%;
  .base-table-form {
    background: #fff;
    border-radius: 2px;
    padding: 10px 10px 0;
    :deep(.bin-form) {
      display: flex;
      flex-wrap: wrap;
      .bin-form-item {
        margin-right: 0;
        margin-bottom: 10px;
        width: 33.33333333%;
        .bin-form-item__label {
          padding-left: 6px;
        }
      }
    }
  }
  .base-table-box {
    background: #fff;
    border-radius: 2px;
    padding: 10px;
    .base-table-action {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .base-table-pagination {
    background: #fff;
    border-radius: 2px;
    padding: 10px;
    text-align: left;
  }
}
</style>
