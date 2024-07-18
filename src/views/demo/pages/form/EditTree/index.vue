<template>
  <div class="edit-tree-container">
    <div class="edit-tree-header">
      <slot name="header">
        <b-tag type="primary">返回响应</b-tag>
        <b-button type="success" size="mini" plain icon="plus" @click="emit('appendRootNode')">
          <span class="f-s-12">增加根节点</span>
        </b-button>
      </slot>
    </div>
    <div class="edit-tree-content">
      <b-tree
        :data="data"
        :render="renderContent"
        :allow-drop="allowDrop"
        style="min-width: 800px"
        ref="treeRef"
        draggable
        default-expand
        lock-select
      ></b-tree>
    </div>
  </div>
</template>

<script setup>
import { h, ref } from 'vue'
import RenderNode from './RenderNode.vue'
/**
 * 编辑树，此处为参考写法，根据不同的业务，可以封装不同的内容和组件，
 */
defineOptions({ name: 'EditTree' })

const emit = defineEmits(['appendRootNode', 'jsonImport', 'appendNode', 'removeNode'])
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  headerTitle: {
    type: String,
    default: '标题',
  },
})

const treeRef = ref(null)

function renderContent({ root, node, data }) {
  return h(RenderNode, {
    root,
    node,
    data,
    onAppend: () => {
      emit('appendNode', data)
    },
    onRemove: () => {
      emit('removeNode', root, node, data)
    },
    onImport: () => {
      emit('jsonImport', root, node, data)
    },
  })
}

function allowDrop(draggingNode, dropNode, type) {
  if (!treeRef.value) return false
  // 获取目标点的父级nodeKeys
  // 获取拉平的数据
  const flat = treeRef.value.getFlatState()
  // console.log(flat, type)
  // console.log(draggingNode, dropNode)
  const targetNode = flat[dropNode.nodeKey]
  const parents = targetNode.parents || []
  // 如果拖拽的放置点，是拖动点的子元素，则不可以放置
  if (parents.indexOf(draggingNode.nodeKey) > -1) return false
  // 如果放置节点为String，则不能放置
  if (type === 'inner' && dropNode.paramType === 'String') return false
  return true
}

function getFlatState() {
  const flat = treeRef.value.getFlatState()
  return flat
}

defineExpose({
  getFlatState,
})
</script>

<style>
@import './edit-tree.css';
</style>
