import { reactive, ref, toRefs, h } from 'vue'
import { BDropdown, BDropdownMenu, BDropdownItem } from 'bin-ui-next'
import { compileFlatState } from '@/components/Service/LinkNode/node-util'
import { getSchema } from '@/api/modules/bi-cube.api'
import { deepCopy, throwError } from '@/utils/util'
import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import settingDropdown from '../src/setting-dropdown.vue'

export default function useSchema(dataset) {
  const nodeEditRef = ref(null)
  const linkEditRef = ref(null)
  // ****************** [左侧表结构] ****************** //
  const tableList = ref([])
  // ****************** [拖拽节点数据] ****************** //
  const status = reactive({
    stateTree: {}, // 表节点树
    flatState: [], // 拉平的树结构
    dragging: false,
    loading: false,
    dimensionTree: {}, // 维度树
    dimensionTreeFlats: [], // 维度树拉平
    dimensionFields: [],
    measureTree: {}, // 度量树
    measureTreeFlats: [], // 度量树拉平
    measureFields: [],
  })
  // ****************** [编辑节点内容缓存] ****************** //
  const currentNodeKey = ref(-1)
  const currentParentNodeKey = ref(-1)

  // 节点点击事件
  function handleNodeClick(nodeKey) {
    const node = status.flatState[nodeKey].node
    currentNodeKey.value = nodeKey
    nodeEditRef.value && nodeEditRef.value.open(dataset, node)
  }

  // 保存一个nodeKey的节点fields选中项
  function saveCheckedFields(nodeKey, selections) {
    const node = status.flatState[nodeKey].node
    // 设置字段选中状态
    node.fields.forEach(item => {
      item._checked = selections.includes(item.field)
    })
  }

  // 保存已勾选的字段
  function saveSelectedFields(selectedFields) {
    saveCheckedFields(currentNodeKey.value, selectedFields)
  }

  // 保存join keys
  function saveJoinKeys(parentSelectedFields, selectedFields, tableInfo) {
    const { joinType, joinKeys } = tableInfo
    // 保存两个节点勾选项
    saveCheckedFields(currentParentNodeKey.value, parentSelectedFields)
    saveCheckedFields(currentNodeKey.value, selectedFields)
    const node = status.flatState[currentNodeKey.value].node
    node.joinType = joinType
    node.joinKeys = deepCopy(joinKeys)
  }

  // 连接桩点击事件
  function handleLinkClick(nodeKey, parentNodeKey) {
    const node = status.flatState[nodeKey].node
    const parentNode = status.flatState[parentNodeKey].node

    currentNodeKey.value = nodeKey
    currentParentNodeKey.value = parentNodeKey

    linkEditRef.value && linkEditRef.value.open(dataset, node, parentNode)
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
        targetKey: fields[0].field,
      })
    }
    children.push({
      id,
      title,
      tableName,
      fields: fields.map(i => ({ ...i, _checked: true })),
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
      fields: fields.map(i => ({ ...i, _checked: true })),
    }
    updateStateTree()
  }


  // 维度度量树
  function renderContent({ root, node, data }) {
    const inline = [
      h('span',
        {
          class: `${data.type} t-ellipsis`,
          style: { width: 'calc(100% - 24px)' },
          flex: 'cross:center',
          title: `${data.title}-(${data.field})`,
        },
        [
          ...[data.nodeType !== 'root' ? h(fieldTypeIcon, {
            type: data.dataType,
            style: { marginRight: '4px' },
          }) : null],
          data.title,
        ],
      ),
    ]
    if (data.nodeType !== 'root') {
      inline.push(h(settingDropdown, { data, onCommand: handleDmCommand }))
    }
    return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
  }

  // 维度度量，字段操作函数
  function handleDmCommand({ name, node }) {
    console.log({ name, node })
  }

  // 更新树数据
  const updateStateTree = () => {
    status.flatState = compileFlatState(status.stateTree)
  }
  // 更新字段数据
  const updateFieldState = () => {
    status.dimensionTreeFlats = compileFlatState(status.dimensionTree)
    status.dimensionFields = status.dimensionTreeFlats.filter(v => v.node.nodeType === 'attribute')
    status.measureTreeFlats = compileFlatState(status.measureTree)
    status.measureFields = status.measureTreeFlats.filter(v => v.node.nodeType === 'attribute')
  }
  // 初始化数据表
  const initData = async () => {
    status.loading = true
    try {
      const { physicalSchema, cubeSchema } = await getSchema(dataset)
      // 表节点树
      status.stateTree = physicalSchema
      updateStateTree()
      // 维度、度量树
      status.dimensionTree = cubeSchema.dimension || {}
      status.measureTree = cubeSchema.measure || {}
      updateFieldState()
    } catch (e) {
      throwError('cube-table-list/initTable')
    }
    status.loading = false
  }

  initData()

  return {
    nodeEditRef,
    linkEditRef,
    tableList,
    ...toRefs(status),
    currentNodeKey,
    handleNodeClick,
    handleNodeRemove,
    handleNodeDrop,
    handleLinkClick,
    handleEmptyDrop,
    saveSelectedFields,
    saveJoinKeys,
    renderContent,
    handleDmCommand,
  }
}