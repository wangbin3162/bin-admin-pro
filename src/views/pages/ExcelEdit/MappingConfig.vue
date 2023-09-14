<template>
  <div class="mapping-config">
    <div class="top-title">
      <span class="l1">位置</span>
      <span class="l2">字段标识</span>
      <span class="l3">字段名称</span>
      <span class="l4">类型</span>
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
          <drag-handle class="drag-handle"></drag-handle>
          <div class="mapping-content">
            <b-space :size="4">
              <b-tag style="width: 38px; justify-content: center; padding: 0 4px">
                {{ element.cellPosition.start }}
              </b-tag>
              <b-input v-model="mapping[index].filedName" size="small" placeholder="字段标识" />
              <b-input v-model="mapping[index].filedTitle" size="small" placeholder="字段名称" />
              <b-select v-model="mapping[index].dataType" size="small" style="width: 70px">
                <b-option label="文本" value="string"></b-option>
                <b-option label="数值" value="number"></b-option>
                <b-option label="日期" value="date"></b-option>
              </b-select>
            </b-space>
          </div>
          <i class="destroy b-iconfont b-icon-delete" @click="handleRemove(index)"></i>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import { excelData } from './useData'

const mapping = computed({
  get: () => excelData.value.mapping,
  set: val => (excelData.value.mapping = val),
})

function handleRemove(index) {
  mapping.value.splice(index, 1)
}
</script>

<style scoped>
.mapping-config {
  .top-title {
    display: flex;
    align-items: center;
    padding: 8px 24px;
    background-color: var(--v-g-fill-color-2);
    .l1 {
      width: 40px;
      text-align: center;
    }
    .l2 {
      width: 88px;
      padding-left: 8px;
    }
    .l3 {
      width: 88px;
      padding-left: 8px;
    }
    .l4 {
      width: 78px;
      padding-left: 8px;
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
        padding-left: 6px;
        :deep(.bin-input) {
          padding: 0 6px;
        }
      }
      .destroy {
        margin-left: 8px;
        width: 20px;
        font-size: 18px;
        color: #f5222d;
        transition: color 0.2s ease-out;
        cursor: pointer;
        &:hover {
          color: #f74e57;
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
