<template>
  <page-wrapper desc="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景" show-close content-bg>
    <p v-for="i in 100" :key="i">站位行。。。</p>
    <page-footer>
      <b-button>提交</b-button>
      <template #right>
        <b-button>取消</b-button>
      </template>
    </page-footer>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Page/PageWrapper'
import PageFooter from '@/components/Page/PageFooter'

export default {
  name: 'Demo',
  components: { PageFooter, PageWrapper }
}
</script>

<style scoped>

</style>
