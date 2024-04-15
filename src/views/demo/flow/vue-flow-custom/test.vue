<template>
  <div style="height: 500px">
    <VueFlow
      v-model="elements"
      @nodeClick="nodeClickHandler"
      fit-view-on-init
      @edgeClick="clickadd"
      @edge-update="onEdgeUpdate"
      :style="{ background: 'transparent' }"
      :default-zoom="1.5"
    >
      <Background :pattern-color="'#aaa'" gap="8" />

      <template #node-custom="props">
        <CustomNode :node="props" />
      </template>
      <!-- 新增 @edgeClick="clickadd"  -->
    </VueFlow>
  </div>
  <dynamic-modal
    :visible="visible"
    top="15vh"
    width="500px"
    :title="title"
    :form="addForm"
    :items="items"
    @submit="submit"
    @reset="reset"
    @close="close"
  />

  <dynamic-modal
    :visible="visible_edit"
    top="15vh"
    width="500px"
    :title="'修改节点'"
    :form="editForm"
    :items="items"
    @submit="submit2"
    @reset="reset"
    @close="close"
  />
</template>

<script setup>
import { ref, reactive, computed, watch, markRaw } from 'vue'
import { Panel, PanelPosition, VueFlow, useVueFlow, isNode, applyChanges } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { onMounted } from 'vue'
import useLoading from '@/hooks/loading'
import dynamicModal from '@/components/modal/dynamicModal.vue'
import { Message } from '@arco-design/web-vue'
import { queryPostList } from '@/api/data-assets/base-assets.ts'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import CustomNode from './CustomNode.vue'

const props = defineProps(['processData'])
const { loading, setLoading } = useLoading(true)

const { t } = useI18n()

const {
  nodes,
  addNodes,
  updateEdge,
  removeEdges,
  getElements,
  getNode,
  addEdges,
  onConnect,
  dimensions,
} = useVueFlow()
onConnect(params => addEdges(params))
const visible = ref(false)
const visible_edit = ref(false)
const title = ref('选择节点操作')
const img_params = ref({})
// const nodeTypes = {
//   custom: markRaw(CustomNode),
// }
let addForm = ref({
  nodeOperations: '',
  postNames: [],
  ccNames: [],
})
let editForm = ref({
  nodeOperations: '',
})
const op2 = [
  { label: '审批', value: '审批' },
  { label: '确认', value: '确认' },
  { label: '处理', value: '处理' },
]
let optionPost = ref([])
// 新增、编辑弹框
const items = reactive([
  {
    field: 'nodeOperations',
    width: 24,
    label: computed(() => t('data.departmentCollaboration.columns.process.flow_1')),
    disabled: true,
    type: 'radio_comm',
    option: op2,
    rules: [
      {
        required: true,
        message: computed(() => t('data.departmentCollaboration.columns.process.select')),
      },
    ],
    placeholder: computed(() => t('data.dictory.form.columns.desc.placeholder')),
  },
  {
    field: 'postIds',
    type: 'select',
    label: computed(() => t('data.departmentCollaboration.columns.process.flow_2')),
    multiple: true,
    fieldNames: { label: 'postName', value: 'postId' },
    rules: [
      {
        required: true,
        message: computed(() => t('data.departmentCollaboration.columns.process.select')),
      },
    ],
    option: optionPost,
    placeholder: computed(() => t('data.departmentCollaboration.columns.process.select')),
  },
  {
    field: 'ccIds',
    type: 'select',
    label: computed(() => t('data.departmentCollaboration.columns.process.flow_3')),
    multiple: true,
    fieldNames: { label: 'postName', value: 'postId' },
    rules: [
      {
        required: true,
        message: computed(() => t('data.departmentCollaboration.columns.process.select')),
      },
    ],
    option: optionPost,
    placeholder: computed(() => t('data.departmentCollaboration.columns.process.select')),
  },
])
// 提交方法
const submit = async params => {
  // console.log(params,img_params.value)
  // let ccNames = []
  // params.ccIds.forEach(id=>{
  //   ccNames.push(optionPost.value.filter(i=>i.postId==id)[0].postName)
  // })
  // params.ccNames = ccNames
  // let postNames = []
  // params.postIds.forEach(id=>{
  //   postNames.push(optionPost.value.filter(i=>i.postId==id)[0].postName)
  // })
  // params.postNames = postNames
  try {
    await addRandomNode(params)
    visible.value = false
    Message.success('添加成功')
  } catch (error) {
    console.log(error)
  }
}

// 重置方法
const reset = () => {
  addForm.value = {
    remark: undefined,
  }
  editForm.value = {
    remark: undefined,
  }
}
const close = () => {
  visible.value = false
  visible_edit.value = false
  addForm.value = {
    remark: undefined,
  }
  editForm.value = {
    remark: undefined,
  }
}
function clickadd(params) {
  Message.info('暂无法新增')
  // img_params.value=params
  // console.log("点击",params)
  // visible.value = true
}
const handleEdgeMouseEnter = edge => {
  console.log('Mouse entered edge:', edge)
}
// let elements = ref([])
// elements = computed(() => {
//     return JSON.parse(JSON.stringify(props.processData))
//   })
const elements = ref([
  {
    id: '1',
    type: 'input',
    position: { x: 400, y: 5 },
    label: '发起人',
    data: {
      title: '发起人',
      content: '这是发起人的内容',
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '确认', //操作节点
    },
  },

  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 100 },
    label: '审批',
    // template: markRaw(OverwriteCustomNode),
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '审批', //操作节点
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 250 },
    label: '处理',
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '处理', //操作节点
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 400, y: 400 },
    label: '确认',
    data: {
      ccIds: [], //抄送人IDs 实际为岗位数组
      postIds: [], //操作人IDs 实际为岗位数组
      postNames: [],
      ccNames: [],
      nodeOperations: '确认', //操作节点
    },
  },
  {
    id: '5',
    type: 'output',
    position: { x: 400, y: 550 },
    label: '完成',
    data: {
      title: '流程结束',
      content: '这是流程结束的内容',
    },
  },

  {
    id: 'e1-2',
    source: '1',
    type: 'smoothstep',
    label: '＋',
    target: '2',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },

  {
    id: 'e2-3',
    source: '2',
    type: 'smoothstep',
    label: '＋',
    target: '3',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },

  {
    id: 'e3-4',
    source: '3',
    type: 'smoothstep',
    label: '＋',
    target: '4',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },

  {
    id: 'e4-5',
    source: '4',
    type: 'smoothstep',
    label: '＋',
    target: '5',
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  },
])
//取父组件的值
//elements.value = props.processData
// console.log(props.processData)
// 修改方法
const submit2 = async params => {
  console.log('params', JSON.stringify(params))
  let ccNames = []
  JSON.parse(JSON.stringify(params.ccIds)).forEach(id => {
    ccNames.push(optionPost.value.filter(i => i.postId == id)[0].postName)
  })
  params.ccNames = ccNames
  let postNames = []
  params.postIds.forEach(id => {
    postNames.push(optionPost.value.filter(i => i.postId == id)[0].postName)
  })
  params.postNames = postNames

  console.log('params', JSON.stringify(params))
  console.log(elements.value, elements)
  elements.value.forEach(e => {
    if (e.id == img_params.value.node.id) {
      // console.log("匹配到了")
      e.data = JSON.parse(JSON.stringify(params))
      e.label = e.data.nodeOperations + '<br/>' + e.data.postNames
      // console.log(e)
    }
  })
  console.log(elements.value)
  visible_edit.value = false
  // try {
  //   await addRandomNode(params)
  //   visible.value = false
  //   Message.success("添加成功")
  // } catch (error) {

  // }
}
const nodeClickHandler = params => {
  console.log()
  console.log(JSON.stringify(params.node.data))
  // 如果是发起工单和流程结束，跳过
  if (params.node.label == '发起人' || params.node.label == '完成') return
  img_params.value = params
  console.log('点击', params)
  visible_edit.value = true
  editForm.value = params.node.data
}
// addNodes(node1)
// addEdges(edge1)

//新增一个节点
function addRandomNode(params) {
  console.log(img_params)
  //1.新建node，节点位置为(img_params.value.edge.events.sourceX+img_params.value.edge.events.targetX)/2-30,(img_params.value.edge.events.sourceY+img_params.value.edge.events.targetY)/2-15,
  //2.将当前edge线段的target改为新建的nodeid
  //3.新建一个edge线段，source为新建的nodeid，target为原有target，即img_params.value里面的
  //4.将当前新建的node节点以及往后的所有节点的y都新增150
  const nodeId = (nodes.value.length + 1).toString() + 'add'
  // console.log(getNode,img_params.value.edge.source)
  // console.log(getNode,img_params.value.edge.source)
  // const source = getNode(img_params.value.edge.source)
  // console.log(source)
  const newNode = {
    id: nodeId,
    label: JSON.parse(JSON.stringify(params.nodeOperations)),
    type: 'custom',
    // label: `新增Node: ${nodeId}`,
    position: {
      x: img_params.value.edge.sourceX - 75,
      y: (img_params.value.edge.sourceY + img_params.value.edge.targetY) / 2 - 15,
    },
    // position: { x: (img_params.value.edge.sourceX + img_params.value.edge.targetX) / 2 - 30, y: (img_params.value.edge.sourceY + img_params.value.edge.targetY) / 2 - 15 },
    data: JSON.parse(JSON.stringify(params)),
    // position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }
  removeEdges(img_params.value.edge.id)
  const newEdge = {
    id: img_params.value.edge.id,
    source: img_params.value.edge.source,
    type: img_params.value.edge.type,
    label: img_params.value.edge.label,
    target: nodeId,
    updatable: img_params.value.edge.updatable,
    // events: { click: clickadd },
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  }
  const newEdge2 = {
    id: nodeId + 'add',
    source: nodeId,
    type: img_params.value.edge.type,
    label: img_params.value.edge.label,
    target: img_params.value.edge.target,
    updatable: img_params.value.edge.updatable,
    // events: { click: clickadd },
    labelBgPadding: [8, 4],
    labelStyle: { fill: '#fff', fontWeight: 700 },
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#10b981', color: '#fff', fillOpacity: 1 },
  }
  //   //找到当前指向的下一个节点
  //   let index = elements.value.findIndex(item => item.id == img_params.value.edge.target)
  //   // console.log(elements.value,img_params.value.edge.target)
  //   // console.log(elements.value.findIndex(item => item.id == img_params.value.edge.target))
  //   //将节点的y设置
  //   for (let i = 0; i > index-1; i++) {
  //     let node = elements.value[i]
  //     if(isNode(node)){
  //       console.log("是node")
  //       node.position.y = node.position.y +153
  //       // applyChanges(elements.value,{nodes:[node]})
  //     }
  //   }
  // console.log(elements.value)
  addNodes([newNode])
  addEdges([newEdge])
  addEdges([newEdge2])
}

//新增一个分支
function onEdgeUpdate({ edge, connection }) {
  console.log(edge, connection)
  return updateEdge(edge, connection)
}
const dosomething = () => {
  // return getElements.value
  return elements.value
}
onMounted(async () => {
  const a = { page: 1, pageSize: 1000 }
  try {
    const { data } = await queryPostList(a)
    optionPost.value = data.records
  } catch (err) {
    Message.error(err.message)
  }
})
watch(visible_edit, newValue => {
  // console.log(elements.value)
  if (!newValue) {
    // console.log("修改？？",newValue)
    // 可以在这里执行重新渲染操作
    elements.value = [...elements.value]
    // console.log("修elements改？？",elements.value)
  }
})
defineExpose({
  dosomething,
})
</script>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';

/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';

.node-title {
  font-weight: bold;
}

.node-content {
  margin-top: 4px;
}
</style>
