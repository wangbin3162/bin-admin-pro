import DatasourceCreate from '@/utils/datasource-create'
import { deepCopy, getUuid } from '@/utils/util'
import { defaultTemps } from '@/utils/luckysheet-util/example'

const Ds = new DatasourceCreate('__EXCEL_DATASOURCE__')
const storeKey = '__excel_data__'

// 默认状态
const states = {
  excelList: deepCopy(defaultTemps),
  dataList: [
    {
      id: '8452b2e4f3124589b13e14a658099f9a',
      tempId: '0001',
      tempName: '工资填报',
      data: {
        name: '李雷',
        age: 26,
        gongzi: 234523,
        sex: '男',
      },
    },
  ],
}

// 获取datasource
async function getDataSource(key = storeKey) {
  const store = await Ds.getStorage(key)
  if (!store) {
    return await Ds.setStorage(key, states)
  } else {
    return store
  }
}

// 设置库表
async function setStoreData(value, key = storeKey) {
  return await Ds.setStorage(key, value)
}

// --------------------------------template api-------------------------------- //
// 获取填报列表（excel模板列表）
export async function getExcelList(query) {
  const { excelList } = await getDataSource()
  return new Promise(resolve => {
    const { page, size, name, isPublish } = query
    const filterList = excelList.filter(
      i => i.name.includes(name) && (i.isPublish === isPublish || isPublish === ''),
    )
    const result = []
    let pageCount = Math.ceil(filterList.length / size)

    for (let i = 0; i < pageCount; i++) {
      let startIndex = i * size
      let endIndex = startIndex + size
      let pageItems = filterList.slice(startIndex, endIndex)
      result.push(pageItems)
    }

    setTimeout(() => {
      resolve({
        rows: result[page - 1],
        total: filterList.length,
      })
    }, 200)
  })
}

// 获取填报列表（excel模板列表）
export async function addTemplate(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    // 模拟新增一个填报
    const obj = deepCopy(data)
    obj.id = getUuid()
    obj.isPublish = '0'
    obj.reportCount = 0
    obj.records = 0
    store.excelList.unshift(obj)

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(obj.id)
    }, 200)
  })
}

// 修改一个填报表单信息
export async function modifyTemplate(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === data.id)
    if (index > -1) {
      store.excelList.splice(index, 1, data)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 获取填报列表（excel模板列表）
export async function removeTemplate(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === id)
    if (index > -1) {
      store.excelList.splice(index, 1)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 发布当前报表
export async function publishTemplate(id) {
  const data = await getTempDetail(id)
  data.isPublish = '1'
  return modifyTemplate(data)
}

// 根据一个id，来获取一个已有的内容
export async function getTempDetail(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.excelList.findIndex(i => i.id === id)
    setTimeout(() => {
      const data = index > -1 ? deepCopy(store.excelList[index]) : null
      resolve(data)
    }, 200)
  })
}

// --------------------------------data api-------------------------------- //
export async function addSheetData(data) {
  const store = await getDataSource()
  if (!store.dataList) {
    store.dataList = []
  }
  return new Promise(resolve => {
    // 新增一个填报数据
    const obj = deepCopy(data)
    obj.id = getUuid()
    store.dataList.unshift(obj)

    // 新增一个之后，更新一下当前tempId的记录
    const index = store.excelList.findIndex(i => i.id === obj.tempId)
    if (index > -1) {
      const count = store.dataList.filter(i => i.tempId === obj.tempId).length
      store.excelList[index].reportCount = store.excelList[index].records = count
      console.log(store)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(obj.id)
    }, 200)
  })
}

// 获取填报列表（excel模板列表）
export async function getSheetDataList(query) {
  const { dataList } = await getDataSource()
  return new Promise(resolve => {
    const { tempId } = query
    const filterList = dataList.filter(i => i.tempId === tempId)
    setTimeout(() => {
      resolve({
        rows: filterList,
        total: filterList.length,
      })
    }, 200)
  })
}

// 获取填报列表（excel模板列表）
export async function removeSheetData(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.dataList.findIndex(i => i.id === id)
    if (index > -1) {
      store.dataList.splice(index, 1)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

// 获取一个填报信息
export async function getSheetDataDetail(id) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.dataList.findIndex(i => i.id === id)
    setTimeout(() => {
      const data = index > -1 ? deepCopy(store.dataList[index]) : null
      resolve(data)
    }, 200)
  })
}

// 修改一个填报信息
export async function modifySheetData(data) {
  const store = await getDataSource()

  return new Promise(resolve => {
    const index = store.dataList.findIndex(i => i.id === data.id)
    if (index > -1) {
      store.dataList.splice(index, 1, data)
    }

    setStoreData(store) // 设置store
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}
