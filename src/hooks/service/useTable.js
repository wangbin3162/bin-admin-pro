import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { Notice } from 'bin-ui-next'
import { addResizeListener, removeResizeListener } from '@/utils/util'

/**
 * 表格分页等函数hook，可以支持数据参数，page配置等
 * @param fetch 请求函数
 * @param params 请求参数
 * @param isPagination 是否是分页数据，如是分页数据则会有专门的total赋值，否则不分页的话赋值为list.length
 * @param listKey 列表数据返回的key值，默认分页的话为rows，传入null的话直接从data中取得
 */
export default function useTable(fetch, params = {}, isPagination = true, listKey = 'rows') {
  // table 的容器 dom，用于计算宽高值
  const tableWrapRef = ref(null)
  const loading = ref(false) // list loading status
  // list 的 total
  const total = ref(0)
  const list = ref([])
  const wrapSize = {
    width: 0,
    height: 0
  }

  // fun：获取数据
  async function getDataSource() {
    if (!fetch) return
    try {
      setLoading(true)
      const data = await fetch(params)
      list.value = listKey ? data[listKey] : data
      total.value = isPagination ? (data.total || 0) : data.list.length
    } catch (e) {
      console.log(e)
      Notice.error(e)
    }
    setLoading(false)
  }

  // fun：刷新表格
  async function reload() {
    if (isPagination && params.page) {
      params.page = 1
    }
    await getDataSource()
  }

  // fun：设置表格loading状态
  function setLoading(status) {
    loading.value = status
  }

  // fun:page-change
  async function pageChange(page) {
    params.page = page
    await getDataSource()
  }

  // fun:page-size-change
  async function pageSizeChange(size) {
    params.page = 1
    params.size = size
    await getDataSource()
  }

  function updateWrapSize() {
    const wrap = tableWrapRef.value.value?.getBoundingClientRect()
    wrapSize.width = wrap.width
    wrapSize.height = wrap.height
  }

  onMounted(() => {
    addResizeListener(tableWrapRef.value, updateWrapSize)
  })

  onBeforeUnmount(() => {
    removeResizeListener(tableWrapRef.value, updateWrapSize)
  })

  return {
    tableWrapRef,
    loading,
    total,
    list,
    getDataSource,
    reload,
    setLoading,
    pageChange,
    pageSizeChange
  }
}