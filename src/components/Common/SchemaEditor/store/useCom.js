import { ref } from 'vue'

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

// 选择区域
function selectCom(component) {
  if (!component) {
    selectedCom.value = null
    return
  }
  selectedCom.value = component
  areaData.value.showArea = false
}

export { comps, selectedCom, hoveredComId, areaData, resetCompStatus, selectCom }
