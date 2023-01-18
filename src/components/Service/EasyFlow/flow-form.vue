<template>
  <div class="ef-node-form">
    <div class="ef-node-form-header">编辑</div>

    <div class="ef-node-form-body">
      <b-form :model="state.line" ref="dataForm" label-width="80px" v-show="state.type === 'line'">
        <b-form-item label="条件">
          <b-input v-model="state.line.label"></b-input>
        </b-form-item>
        <b-form-item>
          <b-button icon="close">重置</b-button>
          <b-button type="primary" icon="check" @click="saveLine">保存</b-button>
        </b-form-item>
      </b-form>
      <b-ace-editor :model-value="JSON.stringify(state, null, 2)" height="400px" />
    </div>
  </div>
</template>

<script setup>
import { deepCopy } from '@/utils/util'
import { reactive } from 'vue'

const emit = defineEmits(['setLineLabel'])

const state = reactive({
  type: 'node', // node 或 line
  node: {},
  line: {},
  data: {},
})

// 节点初始化
function nodeInit(nodeData, id) {
  state.type = 'node'
  state.data = nodeData
  nodeData.nodeList.forEach(node => {
    if (node.id === id) {
      state.node = deepCopy(node)
    }
  })
}

// 线内容初始化
function lineInit(nodeData, line) {
  state.type = 'line'
  state.data = nodeData
  state.line = line
}

// 保存连线
function saveLine() {
  emit('setLineLabel', state.line)
}

defineExpose({
  nodeInit,
  lineInit,
})
</script>

<style scoped lang="stylus">
.ef-node-form-header {
    height: 32px;
    border: 1px solid #dce3e8;
    background: #F1F3F4;
    color: #000;
    line-height: 32px;
    padding-left: 12px;
    font-size: 14px;
}

.ef-node-form-body {
    margin-top: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
}
</style>
