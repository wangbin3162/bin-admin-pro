<template>
  <div>
    <b-modal v-model="visible" :title="title" width="600" :mask-closable="false">
      <b-alert show-icon>{{ normalText }}</b-alert>
      <div class="paster-wrap">
        <b-ace-editor v-model="formatJson" @change="jsonChange" />
        <b-card class="box-card" width="480px" head-tip shadow="never">
          <template v-slot:header>
            <div flex="main:justify cross:center">
              <span>示例</span>
            </div>
          </template>
          <div class="example-wrap">
            <div class="code">
              <highlightjs language="json" :code="codeExample" />
            </div>
          </div>
        </b-card>
      </div>
      <p class="tip" v-if="tip">{{ tip }}</p>
      <template #footer>
        <b-button @click="handleClose">取 消</b-button>
        <b-button type="primary" @click="handleOk" :loading="loading">确 定</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'JsonPaster',
}
</script>

<script setup>
import { ref } from 'vue'
import { deepCopy, isEmpty } from '@/utils/util'
import { Message } from 'bin-ui-design'

const props = defineProps({
  title: {
    type: String,
    default: 'Json转换',
  },
  normalText: {
    type: String,
    default: '请复制Json中的数据内容，粘贴至下方区域',
  },
  tip: {
    type: String,
  },
})

const emit = defineEmits(['ok'])
const visible = ref(false)
const formatJson = ref('')
const formatData = ref([])
const loading = ref(false)

const codeExample = ref(`[
    "fgroup_fname",
    "fbr",
    "fitemid",
    "fname",
    "fnumber",
    "fcompany",
    "fclassid",
    "ffullname",
    "ffullnumber"
]`)

// 记录当前编辑索引及父级数据
const curIndex = ref(0)
const curParentItem = ref({})

function open(index, parentItem) {
  curIndex.value = index
  curParentItem.value = parentItem
  initData()
  visible.value = true
}

function initData() {
  formatJson.value = ''
  formatData.value = []
}

function setformatData(list) {
  if (!isEmpty(list)) {
    formatData.value = deepCopy(list)
    formatJson.value = JSON.stringify(list, null, 2)
  }
}

function handleOk() {
  loading.value = true
  if (formatData.value.length) {
    emit('ok', formatData.value, curIndex.value, curParentItem.value)
  } else {
    Message.error('请复制粘贴正确内容后提交数据！')
  }
  loading.value = false
}

function jsonChange(val) {
  try {
    formatData.value = JSON.parse(val)
  } catch (e) {
    // Message.error('json转化失败')
  }
}

// 关闭清空
function handleClose() {
  visible.value = false
}

defineExpose({
  open,
  setformatData,
  handleClose,
  initData,
})
</script>

<style scoped>
.paster-wrap {
  display: flex;
  width: 100%;
}
.tip {
  color: #f5222d;
  font-size: 12px;
  padding: 6px 0;
}
:deep(.bin-card .bin-card__body) {
  padding: 10px;
}
:deep(pre code.hljs) {
  background: #fafafa;
}
</style>
