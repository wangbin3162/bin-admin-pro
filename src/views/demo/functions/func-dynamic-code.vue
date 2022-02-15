<template>
  <page-wrapper>
    <template #desc>
      <div>动态编写执行函数体，执行获取返回数据。</div>
    </template>
    <b-collapse-wrap title="基础标题，title参数 或 默认插槽显示标题" shadow="none">
    </b-collapse-wrap>
    <b-collapse-wrap title="标题样式" shadow="none">
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'

export default {
  name: 'FuncDynamicCode',
  components: { PageWrapper },
}
</script>
