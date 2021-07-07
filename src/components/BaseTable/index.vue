<template>
  <div class="base-table">
    <div class="base-table-form">
      <b-form label-width="95px">
        <slot name="filter"></slot>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {}
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
      }
      @media (min-width: 576px) {
        .bin-form-item {
          display: block;
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      @media (min-width: 992px) {
        .bin-form-item {
          display: block;
          flex: 0 0 33.33333333%;
          max-width: 33.33333333%;
        }
      }
      @media (min-width: 768px) {
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
    }
  }
}
</style>
