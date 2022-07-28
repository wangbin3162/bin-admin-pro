<template>
  <div class="success-page-wrap">
    <result status="success" extra-white>
      <template #desc>
        提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。
        本文字区域可以展示简单的补充说明， 如果有额外的显示要求，下面extra插槽可以额外插入复杂内容，但不推荐太多内容。
      </template>
      <template #extra>
        <div style="font-size: 14px">
          <b-steps :current="2" size="small">
            <b-step title="已完成"></b-step>
            <b-step title="进行中"></b-step>
            <b-step title="待进行"></b-step>
            <b-step title="待进行"></b-step>
          </b-steps>
        </div>
      </template>
      <template #actions>
        <b-button type="primary">返回列表</b-button>
        <b-button>查看详情</b-button>
        <b-button background>打 印</b-button>
      </template>
    </result>
  </div>
</template>

<script>
export default {
  name: 'Success',
}
</script>

<style scoped lang="stylus">
.success-page-wrap {
  margin: 16px;
  padding: 40px;
  background: #fff;
  border-radius: 2px;
  :deep(.bin-steps .bin-steps-head) {
    background: #fff;
  }
}
</style>
