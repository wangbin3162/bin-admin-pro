<template>
  <div class="ef-node-form">
    <div class="ef-node-form-header">编辑</div>

    <div class="ef-node-form-body">
      <b-empty v-show="isEmpty">暂未选择元素</b-empty>
      <b-form
        :model="state.node"
        ref="dataForm"
        label-width="80px"
        v-show="state.type === 'node' && state.node.type"
      >
        <b-form-item label="类型">
          <b-input v-model="state.node.type" :disabled="true"></b-input>
        </b-form-item>
        <b-form-item label="名称">
          <b-input v-model="state.node.name" clearable></b-input>
        </b-form-item>
        <b-form-item label="left坐标">
          <b-input v-model="state.node.left" :disabled="true"></b-input>
        </b-form-item>
        <b-form-item label="top坐标">
          <b-input v-model="state.node.top" :disabled="true"></b-input>
        </b-form-item>
        <b-form-item label="ico图标">
          <b-icon-select v-model="state.node.ico"></b-icon-select>
        </b-form-item>
        <b-form-item label="状态">
          <b-select v-model="state.node.state" placeholder="请选择" clearable>
            <b-option
              v-for="item in stateList"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></b-option>
          </b-select>
        </b-form-item>
        <b-form-item>
          <b-button icon="close">重置</b-button>
          <b-button type="primary" icon="check" @click="save">保存</b-button>
        </b-form-item>
      </b-form>

      <b-form :model="state.line" ref="dataForm" label-width="80px" v-show="state.type === 'line'">
        <b-form-item label="类型">
          <b-input v-model="state.type" :disabled="true"></b-input>
        </b-form-item>
        <b-form-item label="条件">
          <b-input v-model="state.line.label" clearable></b-input>
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
import { computed, reactive } from 'vue'

const emit = defineEmits(['setLineLabel', 'saveNode'])

const stateList = [
  {
    state: 'success',
    label: '成功',
  },
  {
    state: 'warning',
    label: '警告',
  },
  {
    state: 'error',
    label: '错误',
  },
  {
    state: 'running',
    label: '运行中',
  },
]

const state = reactive({
  type: 'node', // node 或 line
  node: {},
  line: {},
  data: {},
})

const isEmpty = computed(() => {
  return Object.keys(state.node).length === 0 && Object.keys(state.line).length === 0
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

// 保存节点
function save() {
  state.data.nodeList.forEach(node => {
    if (node.id === state.node.id) {
      node.name = state.node.name
      node.left = state.node.left
      node.top = state.node.top
      node.ico = state.node.ico
      node.state = state.node.state
      emit('saveNode')
    }
  })
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
