<template>
  <div class="demo-wrap">
    <div class="legend" flex>
      <b-cascader
        style="width: 300px"
        size="small"
        v-model="currentTable"
        placeholder="请选择表进行查询"
        clearable
        :options="treeData"
        :props="{ value: 'id', label: 'name', checkStrictly: true }"
      />
      <b-button size="small" @click="searchTable">搜索</b-button>
    </div>
    <div class="container" id="G6Demo03"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { Message } from 'bin-ui-design'
import { fomatTreeData, getMockData } from './data'
import G6Creator from './G6Creator'

const props = defineProps({
  height: {
    type: Number,
    default: 700,
  },
})

const data = getMockData()
const treeData = ref(fomatTreeData())
const currentTable = ref([])

console.log(treeData.value, data)

function tableClick(item) {
  Message(`点击了[${item.name}] 表`)
  console.log(item)
}
let gc
onMounted(() => {
  gc = new G6Creator('G6Demo03', props.height, tableClick)
  gc.render(data)
})

function searchTable() {
  if (currentTable.value && currentTable.value.length === 2) {
    gc.setSelected(currentTable.value[1])
  }
}

onBeforeUnmount(() => {
  if (gc) gc.destroy()
})
</script>

<style scoped>
.demo-wrap {
  position: relative;
  .container {
    display: block;
    width: 100%;
    height: 700px;
  }
  .legend {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
}
</style>
