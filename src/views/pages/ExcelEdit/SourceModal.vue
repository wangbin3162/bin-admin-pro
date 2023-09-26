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
        <b-form-item label="数据值" v-if="datasource.type === 'normal'">
          <template #label>
            <span class="tooltip-label" title="请输入选项，以英文逗号分割，如1,2,3,4">数据值</span>
          </template>
          <div>
            <b-input
              v-model="datasource.normal"
              placeholder="请输入选项，以英文逗号分割，如1,2,3,4"
              clearable
            />
          </div>
        </b-form-item>
        <template v-if="datasource.type === 'cascade'">
          <b-form-item label="依赖项">
            <template #label>
              <span class="tooltip-label" title="填写依赖的单元格索引，如B1">依赖项</span>
            </template>
            <b-row :gutter="4">
              <b-col span="18">
                <b-input v-model="datasource.dependOn" placeholder="依赖的单元格索引，如B1" />
              </b-col>
              <b-col span="6">
                <b-input :model-value="JSON.stringify(dependOnValue)" readonly />
              </b-col>
            </b-row>
          </b-form-item>
          <b-form-item label="数据值">
            <template #label>
              <span
                class="tooltip-label"
                title="编写Json格式的数据值，key值为依赖索引的值，如A对应1,2编写为 { 'A': '1,2' }"
              >
                数据值
              </span>
            </template>
            <div>
              <b-ace-editor height="200" v-model="datasource.cascade"></b-ace-editor>
              <b-button type="text" @click="handleFormat">格式化</b-button>
            </div>
          </b-form-item>
        </template>
        <template v-if="datasource.type === 'fx'">
          <b-form-item label="支持函数">
            <b-space>
              <b-tooltip placement="top" theme="light">
                <b-tag>MATCH</b-tag>
                <template #content>
                  <div>使用MATCH(D11, A1:A7, 0)函数获取数据项内容</div>
                  <div>第一个参数为填充到哪个单元格</div>
                  <div>第二个参数为单元格选区</div>
                  <div>第三个参数为哪个工作表索引</div>
                </template>
              </b-tooltip>
              <b-tooltip placement="top" theme="light">
                <b-tag>COUNTIF</b-tag>
                <template #content>
                  <div>COUNTIF(A1:A7,B1:B7)函数设置条件过滤</div>
                  <div>第一个参数为条件key值取值内容</div>
                  <div>第二个参数为实际选项内容</div>
                  <div>注意：COUNTIF 函数需要配合MATCH函数共同使用</div>
                </template>
              </b-tooltip>
            </b-space>
          </b-form-item>
          <b-form-item label="数据值">
            <template #label>
              <span class="tooltip-label" title="使用MATCH()函数获取数据项内容">数据值</span>
            </template>
            <div>
              <b-input v-model="datasource.fx" type="textarea" />
            </div>
          </b-form-item>
        </template>
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
import { computed, ref } from 'vue'
import { MappingItem } from '@/utils/luckysheet-util/default-data'
import { convertToRowColumn } from '@/utils/luckysheet-util/utils'
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

const dependOnValue = computed(() => convertToRowColumn(datasource.value.dependOn))

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

<style scoped>
.tooltip-label {
  cursor: help;
  border-bottom: 1px dashed #acacac;
}
</style>
