import { nextTick, ref, watch } from 'vue'
import { Notice } from 'bin-ui-next'

/**
 * 获取树结构hook
 * @param fetch 填充数据，可选api或者直接传入数组或对象
 * @param params 请求数据的参数
 * @param ctx setup ctx
 * @param titleKey
 */
export default function useTree(fetch, params = {}, ctx, titleKey = 'text') {
  const treeRef = ref(null)
  // 树节点原始数据
  const treeData = ref([])
  const query = ref('')
  // 树渲染loading
  const loading = ref(false)
  const hasChecked = ref(false)

  // fun：获取数据
  const getTreeData = async () => {
    if (!fetch) return
    if (typeof fetch === 'object') {
      treeData.value = fetch
      console.log(fetch)
      return
    }
    try {
      setLoading(true)
      treeData.value = await fetch(params)
    } catch (e) {
      console.log(e)
      Notice.error(e)
    }
    setLoading(false)
  }

  // 重载树结构，可附加选中的节点keys
  const reloadTree = async (keys = []) => {
    await getTreeData()
    await nextTick()
    treeRef.value && treeRef.value.setSelected(keys)
  }

  // 重载树结构，附加checked 回显用
  const reloadTreeWithCheck = async (keys = []) => {
    await getTreeData()
    await nextTick()
    treeRef.value && treeRef.value.setChecked(keys)
  }

  // fun：设置表格loading状态
  function setLoading(status) {
    loading.value = status
  }

  const getFlatState = () => {
    return treeRef.value.getFlatState()
  }

  const handleSelect = (selected, node, flatState) => {
    ctx.emit('select-change', node, flatState)
  }

  const handleChecked = (checked, node, indeterminate) => {
    hasChecked.value = checked.length > 0
    // 包含半选节点
    ctx.emit('check-change', checked, node, indeterminate)
  }

  // 过滤树节点
  const handleFilter = (value) => {
    treeRef.value && treeRef.value.filter(value)
  }
  // 过滤函数
  const filterNode = (value, node) => {
    if (!value) return true
    return node[titleKey].indexOf(value) !== -1
  }

  return {
    treeRef,
    query,
    loading,
    treeData,
    hasChecked,
    getFlatState,
    getTreeData,
    reloadTree,
    reloadTreeWithCheck,
    handleFilter,
    filterNode,
    handleSelect,
    handleChecked
  }
}