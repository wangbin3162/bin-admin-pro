import { reactive, ref, toRefs } from 'vue'
import { compileFlatState } from '@/components/Service/LinkNode/node-util'
import { getSchema } from '@/api/modules/bi-cube.api'
import { throwError } from '@/utils/util'
import { Message } from 'bin-ui-next'

export default function useSchema(dataset) {
  // ****************** [左侧表结构] ****************** //
  const tableList = ref([])
  // ****************** [拖拽节点数据] ****************** //
  const status = reactive({
    stateTree: {},
    flatState: [], // 拉平的树结构
    dragging: false,
    loading: false,
  })

  // 节点点击事件
  function handleNodeClick(nodeKey) {
    const node = status.flatState[nodeKey].node
    console.log(nodeKey, node)
    Message(`点击了${node.title}节点`)
  }

  // 连接桩点击事件
  function handleLinkClick(nodeKey, parentNodeKey) {
    const node = status.flatState[nodeKey].node
    const parentNode = status.flatState[parentNodeKey].node
    console.log(nodeKey, parentNodeKey)
    Message(`点击了[${node.title}]-[${parentNode.title}]连接桩`)
  }

  // 节点移除事件
  function handleNodeRemove(nodeKey, parentNodeKey) {
    const node = status.flatState[nodeKey].node
    // 执行移除节点操作
    if (node.nodeKey === 0) { // 根节点删除
      status.stateTree = {}
      updateStateTree()
      return
    }
    const parentNode = status.flatState[parentNodeKey].node
    const index = parentNode.children.indexOf(node)
    parentNode.children.splice(index, 1)
    updateStateTree()
  }

  // 拖拽增加子节点
  function handleNodeDrop(parentNodeKey, tableId) {
    const parentNode = status.flatState[parentNodeKey].node
    const { fields: parentFields } = parentNode
    const table = tableList.value.find(v => v.id === tableId)
    const { id, title, tableName, fields } = table
    if (!table) return
    // 执行新增节点操作
    const children = parentNode.children || []
    const joinKeys = []
    // 拼接默认连接join
    if (parentFields.length && fields.length) {
      joinKeys.push({
        sourceKey: parentFields[0].field,
        sourceType: parentFields[0].type,
        targetKey: fields[0].field,
        targetType: fields[0].type,
      })
    }
    children.push({
      id,
      title,
      tableName,
      fields: fields.map(i => ({ ...i, checked: true })),
      joinType: 'LEFT_OUTER_JOIN',
      joinKeys,
    })
    parentNode.children = children
    updateStateTree()
  }

  // 增加根节点
  function handleEmptyDrop(tableId) {
    const table = tableList.value.find(v => v.id === tableId)
    const { id, title, tableName, fields } = table
    if (!table) return
    status.stateTree = {
      id,
      title,
      tableName,
      fields: fields.map(i => ({ ...i, checked: true })),
    }
    updateStateTree()
  }

  // 更新树数据
  const updateStateTree = () => {
    status.flatState = compileFlatState(status.stateTree)
  }

  // 初始化数据表
  const initData = async () => {
    status.loading = true
    try {
      const { physicalSchema } = await getSchema(dataset)
      status.stateTree = physicalSchema
      updateStateTree()
    } catch (e) {
      throwError('cube-table-list/initTable')
    }
    status.loading = false
  }

  initData()

  return {
    tableList,
    ...toRefs(status),
    handleNodeClick,
    handleNodeRemove,
    handleNodeDrop,
    handleLinkClick,
    handleEmptyDrop,
  }
}
