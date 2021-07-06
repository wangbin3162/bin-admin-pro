<template>
  <div class="base-table">
    <div class="mt-16 t-right">
      <b-page :total="total" show-elevator show-sizer show-total></b-page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    api: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.base-table {
  padding: 16px;
}
</style>
