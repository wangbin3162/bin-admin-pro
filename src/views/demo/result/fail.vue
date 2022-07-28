<template>
  <div class="fail-page-wrap">
    <result status="error">
      <template #desc>请核对并修改以下信息后，再重新提交。</template>
      <template #extra>
        <div style="font-size: 14px">
          <div class="mb-10">您提交的内容有如下错误：</div>
          <div class="mb-10" flex="cross:center">
            <b-icon name="close-circle" color="#f5222d"></b-icon>
            &nbsp; 您的账户已被冻结&nbsp;
            <a>
              立即解冻
              <b-icon name="right"></b-icon>
            </a>
          </div>
          <div flex="cross:center">
            <b-icon name="close-circle" color="#f5222d"></b-icon>
            &nbsp; 您的账户还不具备申请资格&nbsp;
            <a>
              立即升级
              <b-icon name="right"></b-icon>
            </a>
          </div>
        </div>
      </template>
      <template #actions>
        <b-button type="primary">返回修改</b-button>
      </template>
    </result>
  </div>
</template>

<script>
export default {
  name: 'Fail',
}
</script>

<style scoped lang="stylus">
.fail-page-wrap {
  margin: 16px;
  padding: 40px;
  background: #fff;
  border-radius: 2px;
}
</style>
