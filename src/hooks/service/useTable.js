import { ref } from 'vue'
import { Notice } from 'bin-ui-next'

/**
 * 表格分页等函数hook，可以支持数据参数，page配置等
 * @param config 为配置项对象，包含以下几个属性
 * config {
 *   api: fun, 请求封装函数，promise,
 *   params: obj 请求参数，对象，外部定义reactive类型，内部可以进行操作
 * }
 * @param isPagination 是否是分页数据，如是分页数据则会有专门的total赋值，否则不分页的话赋值为list.length
 * @param listKey 列表数据返回的key值，默认分页的话为rows，传入null的话直接从data中取得
 */
export default function useTable(config, isPagination = true, listKey = 'rows') {
  const {
    api,
    params
  } = config
  // list loading status
  const loading = ref(false)
  // list 的 total
  const total = ref(0)
  const list = ref([])

  // fun：获取数据
  async function getDataSource() {
    if (!api) return
    try {
      setLoading(true)
      const data = await api(params)
      list.value = listKey ? data[listKey] : data
      total.value = isPagination ? (data.total || 0) : data.list.length
    } catch (e) {
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

  return {
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
