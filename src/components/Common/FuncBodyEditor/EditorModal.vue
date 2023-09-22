<template>
  <div class="editor-modal">
    <b-modal
      title="事件配置"
      v-model="visible"
      width="1500px"
      draggable
      esc-closable
      @opened="render = true"
    >
      <b-row :gutter="20" v-if="render">
        <b-col span="12">
          <div>
            <b-radio-group model-value="事件脚本" type="capsule" size="small">
              <b-radio label="事件脚本"></b-radio>
            </b-radio-group>
            <FuncBodyEditor v-model="funcBodyStrCache" :augments="augments" :height="height" />
          </div>
        </b-col>
        <b-col span="12">
          <div>
            <div>
              <b-radio-group v-model="exampleIndex" type="capsule" size="small">
                <b-radio v-for="(demo, index) in exampleFun" :key="index" :label="index">
                  {{ `示例${index + 1}` }}
                </b-radio>
              </b-radio-group>
            </div>
            <FuncBodyEditor
              :model-value="exampleFun[exampleIndex]"
              :augments="augments"
              :height="height"
              readonly
            />
          </div>
        </b-col>
      </b-row>

      <div v-else style="height: 414px">
        <b-loading></b-loading>
      </div>

      <template #footer>
        <b-button @click="visible = false">关闭</b-button>
        <b-button type="primary" @click="handleSave">保存</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'FuncBodyEditorModal',
})
const emit = defineEmits(['save'])

const props = defineProps({
  augments: {
    type: Array,
    default: () => [],
  },
  // 示例代码
  exampleFun: {
    type: Array,
    default: () => [],
  },
  // 参数描述
  paramsDesc: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: String,
    default: '340',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const visible = ref(false)
const funcBodyStrCache = ref('')
const render = ref(false)
const exampleIndex = ref(0)

function open(funcBody) {
  render.value = false
  visible.value = true
  funcBodyStrCache.value = funcBody
  exampleIndex.value = 0
}

// 保存按钮
function handleSave() {
  const value = funcBodyStrCache.value
  visible.value = false
  emit('save', value)
}

defineExpose({ open })
</script>
