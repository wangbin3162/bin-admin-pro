import { generateId } from '@/utils/util'
import { ref } from 'vue'
import { MessageBox } from 'bin-ui-next'
import { setActiveTab } from './useSchema'

const findComIndex = (comps, id) => comps.findIndex(c => c.id === id)

// const findCom = (comps, id) => comps.find(c => c.id === id)

// 画布组件
const comps = ref([])
const selectedCom = ref(null)
const hoveredComId = ref('')
// 框选区域
const areaData = ref({ x: 0, y: 0, width: 0, height: 0, showArea: false })

// 初始化控件状态
function resetCompStatus() {
  comps.value = []
  selectedCom.value = null
  hoveredComId.value = ''
}

// 新增组件
function addNewCom() {
  // 根据当前区域，生成一个位置信息标记
  const id = generateId()
  const newCom = {
    id: `comp_${id}`, // 唯一标记
    name: `comp_${id}`, // 模拟的标记名称
    alias: `区域_${id}`, // 标记中文
    attr: {
      x: areaData.value.x | 0,
      y: areaData.value.y | 0,
      w: areaData.value.width | 0,
      h: areaData.value.height | 0,
    },
  }

  comps.value.push(newCom)
  //  设置新增后选中
  selectedCom.value = newCom
}

// 移除一个组件并清空选中，且记录操作
function deleteCom(id) {
  comps.value.splice(findComIndex(comps.value, id), 1)
  selectedCom.value = null
}

function toDeleteCom() {
  const com = selectedCom.value
  if (com) {
    MessageBox.confirm({
      type: 'error',
      title: '是否删除选中的1个组件',
    })
      .then(() => {
        deleteCom(com.id)
      })
      .catch(() => {})
  }
}

function hoverCom(id) {
  hoveredComId.value = id
}

// 选择区域
function selectCom(component) {
  if (!component) {
    selectedCom.value = null
    setActiveTab(false)
    return
  }
  selectedCom.value = component

  setActiveTab(true)
}

export {
  comps,
  selectedCom,
  hoveredComId,
  areaData,
  resetCompStatus,
  selectCom,
  addNewCom,
  deleteCom,
  hoverCom,
  toDeleteCom,
}
