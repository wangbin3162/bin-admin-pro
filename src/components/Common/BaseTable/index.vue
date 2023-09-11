<template>
  <div class="base-table">
    <div class="base-table-form" v-if="$slots.filter" :style="filterStyle">
      <slot name="filter"></slot>
    </div>
    <div class="base-table-box" :style="tableStyle">
      <div class="base-table-action" v-if="$slots.action || $slots.actionRight">
        <div class="left">
          <slot name="action"></slot>
        </div>
        <div class="right">
          <slot name="actionRight"></slot>
        </div>
      </div>
      <slot></slot>
      <div class="base-table-pagination" v-if="$slots.page" :style="pageStyle">
        <slot name="page"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseTable',
})
defineProps({
  filterStyle: Object,
  tableStyle: Object,
  pageStyle: Object,
})
</script>

<style scoped>
.base-table {
  width: 100%;
  .base-table-form {
    background: #fff;
    border-radius: 2px;
    padding: 20px 20px 0;
    border-bottom: 1px solid var(--v-g-border-color);
    :deep(.bin-form) {
      display: flex;
      flex-wrap: wrap;
      .bin-form-item {
        margin-right: 0;
        margin-bottom: 16px;
        width: 33.33333333%;
        .bin-form-item__label {
          padding-left: 8px;
        }
      }
    }
  }
  .base-table-box {
    background: #fff;
    border-radius: 2px;
    padding: 16px 20px;
    .base-table-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .base-table-pagination {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
