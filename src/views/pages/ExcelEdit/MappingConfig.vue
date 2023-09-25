<template>
  <div class="mapping-config">
    <div class="top-title">
      <span class="l1">位置</span>
      <span class="l2">字段标识</span>
      <span class="l3">字段名称</span>
      <span class="l4">类型</span>
      <span class="l5">事件</span>
    </div>
    <b-empty v-if="mapping.length === 0">暂无映射</b-empty>
    <draggable
      v-model="mapping"
      class="mapping-list"
      item-key="element"
      v-bind="{
        animation: 200,
        group: 'mapping',
        ghostClass: 'ghost',
        dragClass: 'drag-item-class',
        handle: '.drag-handle',
      }"
    >
      <template #item="{ element, index }">
        <div class="mapping-item">
          <drag-handle class="drag-handle mr-5"></drag-handle>
          <action-button
            type="text"
            icon="close"
            color="danger"
            is-icon
            tooltip="删除"
            confirm
            @click="handleRemove(index)"
          ></action-button>
          <div class="mapping-content">
            <b-space :size="4">
              <b-tag style="width: 38px; justify-content: center; padding: 0 4px">
                {{ element.cellPosition.start }}
              </b-tag>
              <b-input v-model="mapping[index].fieldName" size="small" placeholder="字段标识" />
              <b-input v-model="mapping[index].fieldTitle" size="small" placeholder="字段名称" />
              <b-select v-model="mapping[index].dataType" size="small" style="width: 70px">
                <b-option label="文本" value="string"></b-option>
                <b-option label="数值" value="number"></b-option>
                <b-option label="日期" value="date"></b-option>
                <b-option label="下拉" value="select"></b-option>
              </b-select>
              <div flex="cross:center">
                <b-checkbox v-model="mapping[index].events.enable"></b-checkbox>
                <b-button
                  :disabled="!mapping[index].events.enable"
                  type="text"
                  @click="handleEditScript(index)"
                >
                  脚本
                </b-button>
              </div>
            </b-space>
          </div>
        </div>
      </template>
    </draggable>

    <FuncBodyEditorModal
      :augments="funcAugments"
      :exampleFun="exampleFunStr"
      ref="funcEditorRef"
      @save="handleScriptSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { mapping } from './useData'

function handleRemove(index) {
  mapping.value.splice(index, 1)
}

const exampleFunStr = [
  `/**
 * 示例一：单元格变更时，更新 B2 单元格的数据为 '更新值'
 * API: setCellValue(row, column, value [,setting])
 */
LuckySheet.setCellValue(1, 1, '更新值')
`,
  `/**
 * 示例二：单元格变更时，更新 B2 单元格的数据验证为下拉
 * 下拉选项是 '独立办公,集中办公' 并设置默认为独立办公
 * API: setDataVerification(optionItem, [setting])
 */
const baseOptionItem = {
  checked: false,
  hintShow: false,
  hintText: '',
  prohibitInput: false,
  remote: false,
  type: 'dropdown',
  type2: false,
  value1: '',
  value2: '',
}

LuckySheet.setDataVerification(
  {
    ...baseOptionItem,
    value1: '独立办公,集中办公',
  },
  {
    range: { row: [1, 1], column: [1, 1] }
  }
)
LuckySheet.setCellValue(1, 1, '独立办公')
`,
  `/**
 * 示例三：根据当前单元格变更做级联更新，更新 B2 单元格的数据验证为下拉
 * 当前单元格为 党政机关/事业单位,教育机构,医院,文化体育场
 * 更新映射后 为一下对应选项
 * API: setDataVerification(optionItem, [setting])
 */
const optionsMap = {
  '党政机关/事业单位':'独立办公,集中办公',
  '教育机构':'高等学校,中小学校',
  '医院':'三级,二级以下',
  '文化体育场':'/'
}

const { newValue }  = cellValue
const keyValue = optionsMap[newValue.v]

console.log(keyValue)

const baseOptionItem = {
  checked: false,
  hintShow: false,
  hintText: '',
  prohibitInput: false,
  remote: false,
  type: 'dropdown',
  type2: false,
  value1: '',
  value2: '',
}

LuckySheet.setDataVerification(
  {
    ...baseOptionItem,
    value1: keyValue,
  },
  {
    range: { row: [1, 1], column: [1, 1] }
  }
)
LuckySheet.setCellValue(1, 1, '')
`,
]
const funcAugments = ref([])
const editIndex = ref(-1)
const funcEditorRef = ref(null)

function handleEditScript(index) {
  if (index > -1 && mapping.value[index] && mapping.value[index].events) {
    const { augments, funcBody } = mapping.value[index].events
    editIndex.value = index
    funcAugments.value = augments
    funcEditorRef.value?.open(funcBody)
  }
}

// 脚本保存
function handleScriptSave(val) {
  const index = editIndex.value
  if (index > -1 && mapping.value[index] && mapping.value[index].events) {
    mapping.value[index].events.funcBody = val
    editIndex.value = -1
  }
}
</script>

<style scoped>
.mapping-config {
  .top-title {
    display: flex;
    align-items: center;
    padding: 8px 0 8px 50px;
    background-color: var(--v-g-fill-color-2);
    .l1 {
      width: 40px;
      text-align: center;
    }
    .l2 {
      width: 105px;
      padding-left: 8px;
    }
    .l3 {
      width: 105px;
      padding-left: 8px;
    }
    .l4 {
      width: 78px;
      padding-left: 4px;
    }
    .l5 {
      width: 55px;
      padding-left: 4px;
    }
  }
  .mapping-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .mapping-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      font-size: 14px;
      label {
        word-break: break-all;
        display: block;
        line-height: 1;
        flex: 1;
        font-size: 14px;
        transition: color 0.4s;
        padding-left: 8px;
      }
      i {
        flex-shrink: 0;
      }
      .mapping-content {
        width: calc(100% - 40px);
        padding: 0 6px;
        :deep(.bin-input) {
          padding: 0 6px;
        }
      }
    }
  }
  .ghost {
    position: relative;
    font-size: 0;
    border: 1px dashed var(--bin-color-primary) !important;
    &::after {
      position: absolute;
      content: '';
      display: block;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff !important;
      background-image: linear-gradient(
        var(--bin-color-primary-light5),
        var(--bin-color-primary-light3),
        var(--bin-color-primary-light5)
      ) !important;
    }
  }
  .drag-item-class {
    background: #fff !important;
    border: 1px solid var(--bin-color-primary) !important;
  }
}
</style>
