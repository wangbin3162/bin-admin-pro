// 获取基础列表
import { useExcelStoreWithOut } from '@/pinia/modules/excel'

// 获取填报列表（excel模板列表）
export async function getExcelList(query) {
  const store = useExcelStoreWithOut()
  const data = store.getList(query)
  return data
}

// 获取填报列表（excel模板列表）
export async function addTemplate(data) {
  const store = useExcelStoreWithOut()
  store.addOne(data)
}

// 获取填报列表（excel模板列表）
export async function remove(id) {
  const store = useExcelStoreWithOut()
  store.removeOne(id)
}
