<template>
  <page-wrapper desc="业务相关的独立组件，包含通用校验配置，字段样式配置等，可参考进行扩展或实现新的业务组件。">
    <b-row :gutter="16">
      <b-col span="12">
        <b-collapse-wrap title="表单校验" shadow="none">
          <div class="p10" style="min-height: 200px;">
            <async-validator></async-validator>
          </div>
        </b-collapse-wrap>
      </b-col>
      <b-col span="12">
        <b-collapse-wrap title="字段样式配置" shadow="none">
          <div class="p10">
            <styles-editor :simple="false"></styles-editor>
          </div>
        </b-collapse-wrap>
      </b-col>
    </b-row>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import StylesEditor from '@/components/Service/StylesEditor/index.vue'
import AsyncValidator from '@/components/Service/AsyncValidator/index.vue'

export default {
  name: 'FuncService',
  components: { AsyncValidator, StylesEditor, PageWrapper },
}
</script>
