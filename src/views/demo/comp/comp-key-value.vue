<template>
  <page-wrapper desc="基础映射配置示例，可拖动">
    <b-row :gutter="16">
      <b-col span="12">
        <b-collapse-wrap title="映射配置" shadow="none">
          <div class="p16">
            <key-value-mapping v-model="mapping"></key-value-mapping>
          </div>
        </b-collapse-wrap>
      </b-col>
      <b-col span="12">
        <b-collapse-wrap title="实际存储值" shadow="none">
          <b-ace-editor :model-value="mappingJson" readonly></b-ace-editor>
        </b-collapse-wrap>
      </b-col>
    </b-row>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper'
import { computed, ref } from 'vue'
import KeyValueMapping from '@/components/Common/KeyValueMapping'

export default {
  name: 'CompKeyValue',
  components: { KeyValueMapping, PageWrapper },
  setup(props) {
    const mapping = ref([
      { key: '1', value: 'a' },
      { key: '2', value: 'b' },
      { key: '3', value: 'c' }
    ])
    const mappingJson = computed(() => JSON.stringify(mapping.value, null, 2))
    return {
      mapping,
      mappingJson
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
