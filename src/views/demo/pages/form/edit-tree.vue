<template>
  <page-wrapper desc="编辑树表，实际开发时可能会根据实际情况进行组件定义和使用。">
    <b-collapse-wrap title="编辑树表" shadow="none">
      <template #right>
        <b-space :size="16">
          <debug-modal ref="transDataRef">
            <b-button type="primary" size="mini" plain @click="showTransData">
              转换数据结构
            </b-button>
          </debug-modal>

          <b-button type="warning" size="mini" plain @click="validData">校验错误</b-button>

          <debug-modal :data="{ treeData, testData }" />
        </b-space>
      </template>
      <div class="p16">
        <b-form :model="treeData" ref="formRef">
          <EditTree
            :data="treeData"
            ref="editTreeRef"
            @import="batchAddNodes"
            @appendRootNode="appendRootNode"
            @appendNode="appendNode"
            @appendLevelNode="appendLevelNode"
            @removeNode="removeNode"
          ></EditTree>
        </b-form>
      </div>
    </b-collapse-wrap>
    <JsonPaster
      ref="jsonPasterRef"
      title="响应参数批量添加"
      tip=""
      @ok="batchAddItems"
    ></JsonPaster>
  </page-wrapper>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Message, MessageBox } from 'bin-ui-design'
import { getUuid } from '@/utils/util'
import EditTree from '@/components/Service/EditTree/index.vue'
import { initFormMaps, validAllForm } from '@/components/Service/EditTree/formValid'
import { scrollToNode } from '@/components/Service/EditTree/scrollToNode'
import { formatArr, formatTree } from '@/components/Service/EditTree/useTreeFormat'
import JsonPaster from './json-paster.vue'

defineOptions({
  name: 'EditTree',
})
initFormMaps()

const formRef = ref(null)
const editTreeRef = ref(null)
const jsonPasterRef = ref(null)

// 转换数据
const transDataRef = ref(null)
function showTransData() {
  const flat = editTreeRef.value.getFlatState()
  const list = formatArr(flat)
  transDataRef.value?.show(list)
}

// 校验
async function validData() {
  // const flat = editTreeRef.value.getFlatState()
  // const list = formatArr(flat)
  // console.log(list)
  // console.log(renderNodeForms.value)
  const valid = await validAllForm()
  if (!valid) {
    Message.error('校验失败，请检查错误！')
  } else {
    Message.success('校验成功！')
  }
}

const testData = ref([
  {
    belongParent: '',
    parent: 'id-00',
    des: '根节点',
    name: 'data',
    paramType: 'Object',
    parentName: '',
    paramId: 'paramId-00',
    interfaceId: 'interfaceId-00',
    level: '1',
    sort: '0',
  },
  {
    belongParent: 'id-00',
    parent: 'id-00-00',
    des: '类别',
    name: 'category',
    paramType: 'Object',
    parentName: 'data',
    paramId: 'paramId-01',
    interfaceId: 'interfaceId-00',
    level: '2',
    sort: '1',
  },
  {
    belongParent: 'id-00-00',
    parent: 'id-00-00-00',
    des: '说明',
    name: 'text',
    paramType: 'String',
    parentName: 'data.category',
    paramId: 'paramId-02',
    interfaceId: 'interfaceId-00',
    level: '3',
    sort: '2',
  },
  {
    belongParent: 'id-00',
    parent: 'id-00-01',
    des: '名称',
    name: 'name',
    paramType: 'String',
    parentName: 'data',
    paramId: 'paramId-03',
    interfaceId: 'interfaceId-00',
    level: '2',
    sort: '3',
  },
  {
    belongParent: 'id-00',
    parent: 'id-00-02',
    des: 'id',
    name: 'id',
    paramType: 'String',
    parentName: 'data',
    paramId: 'paramId-04',
    interfaceId: 'interfaceId-00',
    level: '2',
    sort: '4',
  },
  {
    belongParent: '',
    parent: 'id-01',
    des: '根节点2',
    name: 'data2',
    paramType: 'Object',
    parentName: '',
    paramId: 'paramId-05',
    interfaceId: 'interfaceId-00',
    level: '1',
    sort: '5',
  },
])
const treeData = ref([])

treeData.value = formatTree(testData.value)

// 新增一个根节点
function appendRootNode() {
  const newNode = { parent: getUuid(), name: '', des: '', paramType: 'String' }
  treeData.value.push(newNode)
  nextTick(() => scrollToNode(null))
}

// 新增一个子节点
function appendNode(node, name = '') {
  const children = node.children || []
  node.expand = true
  const newNode = { parent: getUuid(), name, des: '', paramType: 'String' }
  children.push(newNode)
  node.children = children
  treeData.value = [...treeData.value]
  nextTick(() => scrollToNode(newNode))
}

// 新增同级节点
function appendLevelNode(root, node) {
  const parentKey = root.find(el => el === node).parent
  // 如果有父级元素
  if (parentKey > -1) {
    const parent = root.find(el => el.nodeKey === parentKey)?.node
    appendNode(parent)
  } else {
    // 没有父级元素，表示根节点，
    appendRootNode()
  }
}

// 移除拦截
async function removeIntercept(type) {
  return new Promise(resolve => {
    if (type === 'String') resolve(true)
    else {
      MessageBox.confirm({
        type: 'warning',
        title: '提示',
        message: '<p>确定要<span style="color:red;">移除</span>当前节点吗？子节点会一并移除！</p>',
        useHTML: true,
      })
        .then(() => resolve(true))
        .catch(() => resolve(false))
    }
  })
}

// 移除一个子节点
async function removeNode(root, node, data) {
  const result = await removeIntercept(data.paramType)
  if (result) {
    const parentKey = root.find(el => el === node).parent
    // 移除子节点
    if (parentKey > -1) {
      const parent = root.find(el => el.nodeKey === parentKey)?.node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    } else {
      // 移除根节点
      const index = treeData.value.indexOf(data)
      treeData.value.splice(index, 1)
    }
    Message({ type: 'success', message: '移除成功!' })
  }
}

let lastBatchNode = null
// 批量添加数组元素
function batchAddNodes(node) {
  lastBatchNode = node // 缓存当前节点
  jsonPasterRef.value.open()
}

function batchAddItems(data) {
  data.forEach(name => {
    appendNode(lastBatchNode, name)
  })
  Message.success('导入成功')
  jsonPasterRef.value?.handleClose()
}
</script>
