<template>
  <page-wrapper desc="编辑树表，实际开发时可能会根据实际情况进行组件定义和使用。">
    <b-form :model="treeData" ref="formRef">
      <b-collapse-wrap title="编辑树表" shadow="none">
        <template #right>
          <debug-modal :data="{ treeData, testData }" />
        </template>
        <div class="p16">
          <b-row :gutter="16">
            <b-col :span="17">
              <b-form :model="treeData">
                <EditTree
                  :data="treeData"
                  ref="editTreeRef"
                  @appendRootNode="appendRootNode"
                  @appendNode="appendNode"
                  @removeNode="removeNode"
                ></EditTree>
              </b-form>
            </b-col>
            <b-col :span="7">
              <b-ace-editor readonly :model-value="JSON.stringify(treeData, null, 2)" />
            </b-col>
          </b-row>

          <b-space>
            <debug-modal ref="transDataRef">
              <b-button type="primary" plain @click="showTransData">转换数据结构</b-button>
            </debug-modal>

            <b-button type="warning" plain @click="validData">校验错误</b-button>
          </b-space>
        </div>
      </b-collapse-wrap>
    </b-form>
  </page-wrapper>
</template>

<script setup>
import { ref } from 'vue'
import { Message, MessageBox } from 'bin-ui-design'
import { getUuid } from '@/utils/util'
import EditTree from './EditTree/index.vue'
import { initFormMaps, validAllForm } from './EditTree/formValid'

defineOptions({
  name: 'EditTree',
})
initFormMaps()

const formRef = ref(null)
const editTreeRef = ref(null)

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

/**
 * 将拉平的结构数组转换成树形结构
 * @param {*} arr
 */
function formatTree(arr = []) {
  if (!Array.isArray(arr) || arr.length === 0) return []

  let result = []
  let map = {}
  // 本次遍历的目的是为了防止在arr数据混乱的情况下，下面的【map[pid]】找不到对应的值
  arr.forEach((item, index) => {
    map[item.parent] = index // 以id为key，下标为value，方便后面根据pid，找到原来数组的下标，然后添加children
  })

  arr.forEach(item => {
    item.children = []
    const pid = item.belongParent
    if (pid) {
      let parent = arr[map[pid]]['children']
      // 可能原来的数据存在一定混乱，这样可以更加严谨一点，不报push属性找不到的错
      if (Array.isArray(parent)) {
        parent.push(item)
      } else {
        parent = [item]
      }
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 将树结构拉平成一个带有次序的数组
 * @param {*} arr
 */
function formatArr(arr = []) {
  const flat = []
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i]
    const node = ele.node
    // 父元素id，如果存在父元素，则获取父元素的id
    const pId = ele.parent > -1 ? arr[ele.parent].node.parent : ''
    const parents = ele.parents ?? []
    // 组合parentsName
    const names = []
    parents.forEach(p => names.push(arr[p].node.name))
    flat.push({
      belongParent: pId,
      parent: node.parent,
      name: node.name,
      des: node.des,
      paramType: ele.node.paramType,
      // 追加的参数
      parentName: names.join(','),
      level: parents.length + 1,
      sort: i,
    })
  }
  return flat
}

treeData.value = formatTree(testData.value)

// 新增一个根节点
function appendRootNode() {
  treeData.value.push({ parent: getUuid(), name: '', des: '', paramType: 'String' })
}

// 新增一个子节点
function appendNode(node) {
  const children = node.children || []
  node.expand = true
  children.push({ parent: getUuid(), name: '', des: '', paramType: 'String' })
  node.children = children
  treeData.value = [...treeData.value]
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
    if (parentKey !== undefined && parentKey >= 0) {
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

// onMounted(() => ())
</script>
