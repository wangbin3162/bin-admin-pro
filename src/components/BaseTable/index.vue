<template>
  <div class="base-table">
    <div class="base-table-form" v-if="$slots.filter">
      <slot name="filter"></slot>
    </div>
    <div class="base-table-box">
      <div class="base-table-action" v-if="$slots.action || $slots.actionRight">
        <div class="left">
          <slot name="action"></slot>
        </div>
        <div class="right">
          <slot name="actionRight"></slot>
        </div>
      </div>
      <slot></slot>
      <div class="base-table-pagination" v-if="$slots.action">
        <slot name="page"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable'
}
</script>

<style scoped lang="stylus">
.base-table {
  .base-table-form {
    background: #fff;
    border-radius: 2px;
    margin-bottom: 16px;
    padding: 10px 10px 0;
    :deep(.bin-form) {
      display: flex;
      flex-wrap: wrap;
      .bin-form-item {
        margin-right: 0;
        margin-bottom: 10px;
        .bin-form-item__label {
          padding-left: 6px;
        }
      }
      @media (min-width: 576px) {
        .bin-form-item {
          display: block;
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      @media (min-width: 960px) {
        .bin-form-item {
          display: block;
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      @media (min-width: 1200px) {
        .bin-form-item {
          display: block;
          flex: 0 0 33.33333333%;
          max-width: 33.33333333%;
        }
      }
      @media (min-width: 1600px) {
        .bin-form-item {
          display: block;
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
    }
  }
  .base-table-box {
    background: #fff;
    border-radius: 2px;
    padding: 10px;
    .base-table-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }
  .base-table-pagination {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
