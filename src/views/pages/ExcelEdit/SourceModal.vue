<template>
  <b-modal
    title="数据源配置"
    v-model="visible"
    width="1200px"
    draggable
    top="80px"
    esc-closable
    append-to-body
    @opened="render = true"
  >
    <div class="source-config" v-if="render">
      <b-form label-width="120px">
        <b-form-item label="数据源类型">
          <div>
            <b-radio-group v-model="datasource.type" type="capsule">
              <b-radio
                v-for="(val, key) in MappingItem.DatasourceType.mapping"
                :key="key"
                :label="key"
              >
                {{ val }}
              </b-radio>
            </b-radio-group>
          </div>
        </b-form-item>
        <b-form-item label="数据值">
          <template #label>
            <span>数据值</span>
            <b-tooltip
              content="不同数据源的 数据值取值不同，这部分根据参考示例完成编写即可"
              theme="light"
            >
              <b-icon name="question-circle"></b-icon>
            </b-tooltip>
          </template>
          <div>
            <b-input
              v-if="datasource.type === 'normal'"
              v-model="datasource.normal"
              placeholder="请输入选项，以英文逗号分割，如1,2,3,4"
              clearable
            />

            <template v-if="datasource.type === 'cascade'">
              <b-ace-editor height="200" v-model="datasource.cascade"></b-ace-editor>
              <b-button type="text" @click="handleFormat">格式化</b-button>
            </template>
          </div>
        </b-form-item>
      </b-form>
    </div>
    <div v-else style="height: 328px">
      <b-loading></b-loading>
    </div>
    <template #footer>
      <b-button @click="visible = false">关闭</b-button>
      <b-button type="primary" @click="handleSave">保存</b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
import { MappingItem } from '@/utils/luckysheet-util/default-data'
import { deepCopy } from '@/utils/util'
import { Message } from 'bin-ui-next'
const emit = defineEmits(['save'])

const visible = ref(false)
const datasource = ref({})
const render = ref(false)

function open(source) {
  render.value = false
  visible.value = true
  datasource.value = deepCopy(source)
}

// 保存按钮
function handleSave() {
  if (datasource.value.type === 'cascade') {
    const valid = handleFormat()
    if (!valid) return
  }
  const value = deepCopy(datasource.value)
  visible.value = false
  emit('save', value)
}

function handleFormat() {
  try {
    const json = JSON.parse(datasource.value.cascade)
    datasource.value.cascade = JSON.stringify(json, null, 2)
    return true
  } catch (error) {
    Message.error('请输入正确的对象映射！')
    return false
  }
}

defineExpose({ open })
</script>
