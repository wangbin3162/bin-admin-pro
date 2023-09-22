<template>
  <div class="base-tree" :style="{ maxWidth: width }" ref="treeEl">
    <div class="base-tree-header">
      <span class="base-title">{{ treeTitle }}</span>
      <div class="base-ctrl">
        <div class="search">
          <b-input
            v-if="showTopSearch"
            size="small"
            search
            v-model="query"
            placeholder="搜索"
            @search="handleFilter"
            clearable
            @clear="handleReset"
          />
          <slot></slot>
        </div>
        <div class="ctrl">
          <b-dropdown append-to-body placement="bottom-start" @command="handleAction">
            <i class="b-iconfont b-icon-ellipsis"></i>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item name="expandAll">展开全部</b-dropdown-item>
                <b-dropdown-item name="collapseAll">收起全部</b-dropdown-item>
                <template v-if="showCheckbox">
                  <b-dropdown-item name="checkAll" divided>选择全部</b-dropdown-item>
                  <b-dropdown-item name="uncheckAll">取消全选</b-dropdown-item>
                </template>
                <slot name="ctrl"></slot>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
      </div>
    </div>
    <div
      class="tree-wrap"
      :class="{ 'has-bottom': $slots.bottom }"
      :style="{ minHeight, maxHeight }"
      v-loading="loading"
    >
      <div class="tree-inner" v-if="$slots.inner">
        <slot name="inner"></slot>
      </div>
      <div class="inner-search" v-if="showInnerSearch">
        <b-input size="small" search v-model="query" placeholder="搜索" @search="handleFilter" />
      </div>
      <div class="mr-5">
        <b-tree
          :data="treeData"
          :title-key="titleKey"
          :show-checkbox="showCheckbox"
          :filter-node-method="filterNode"
          :render="render"
          :lock-select="lock"
          :default-expand="defaultExpand"
          ref="treeRef"
          @select-change="handleSelect"
          @check-change="handleChecked"
          :empty-text="query ? '查询无结果' : '暂无数据'"
        ></b-tree>
      </div>
    </div>
    <div class="tree-bottom" v-if="$slots.bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup>
import useTree from '@/hooks/service/useTree'
import { computed, nextTick, ref, watch } from 'vue'
import { typeOf } from '@/utils/util'

defineOptions({
  name: 'BaseTree',
})
const emit = defineEmits(['select-change', 'check-change', 'command', 'init-success'])
const props = defineProps({
  width: {
    type: String,
    default: '280px',
  },
  minHeight: {
    type: String,
    default: '300px',
  },
  maxHeight: {
    type: String,
    default: '700px',
  },
  treeTitle: {
    type: String,
  },
  filterPosition: {
    type: String,
    default: 'top',
  },
  lock: Boolean,
  fetch: {
    type: [Function, Array],
  },
  params: {
    type: Object,
  },
  render: Function,
  showCheckbox: {
    type: Boolean,
  },
  checkStrictly: {
    type: Boolean,
  },
  showFilter: {
    type: Boolean,
  },
  titleKey: {
    type: String,
    default: 'text',
  },
  defaultExpand: {
    type: Boolean,
  },
  expandKeys: {
    type: Array,
    default: () => [],
  },
  selectedKeys: {
    type: Array,
    default: () => [],
  },
})

const treeEl = ref(null)
const showTopSearch = computed(() => props.showFilter && props.filterPosition === 'top')
const showInnerSearch = computed(() => props.showFilter && props.filterPosition === 'inner')
const {
  treeRef,
  loading,
  query,
  treeData,
  getTreeData,
  handleSelect,
  handleChecked,
  handleFilter,
  filterNode,
  reloadTree,
  reloadTreeWithCheck,
  handleClear,
  getFlatState,
} = useTree(props.fetch, props.params, emit, props.titleKey)

// 右侧指令事件列表
function handleAction(name) {
  switch (name) {
    case 'expandAll':
      treeRef.value && treeRef.value.expandAll()
      break
    case 'collapseAll':
      treeRef.value && treeRef.value.collapseAll()
      break
    case 'checkAll':
      treeRef.value && treeRef.value.checkAll()
      break
    case 'uncheckAll':
      treeRef.value && treeRef.value.uncheckAll()
      break
  }
  emit('command', name)
}

function setDefault() {
  treeRef.value && treeRef.value.setExpand(props.expandKeys)
  treeRef.value && treeRef.value.setSelected(props.selectedKeys)
}

function handleReset() {
  handleClear()
  setDefault()
}
watch(
  () => props.fetch,
  async val => {
    if (typeOf(val) === 'array') {
      treeData.value = val
      if (val.length > 0) {
        await nextTick()
        setDefault()
      }
      return true
    }
    await getTreeData()
    setDefault()
  },
  { immediate: true },
)

defineExpose({
  treeEl,
  showTopSearch,
  showInnerSearch,
  treeRef,
  query,
  loading,
  treeData,
  getTreeData,
  reloadTree,
  reloadTreeWithCheck,
  handleSelect,
  handleChecked,
  handleAction,
  handleFilter,
  filterNode,
  handleReset,
  getFlatState,
})
</script>

<style scoped>
.base-tree {
  flex-shrink: 0;
  flex-grow: 0;
  background: #fff;
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    border-bottom: 1px solid var(--v-g-border-color);
    height: 45px;
    line-height: 1;
    .base-title {
      color: var(--v-g-text-color);
      width: 80px;
      padding-left: 6px;
    }
    .base-ctrl {
      display: flex;
      align-items: center;
      width: calc(100% - 80px);
      .search {
        flex: 1 1 0;
        text-align: right;
      }
      .ctrl {
        text-align: right;
        width: 24px;
        .b-icon-ellipsis {
          cursor: pointer;
          outline: none;
          font-size: 20px;
          font-weight: bold;
          transform: rotate(90deg);
        }
      }
    }
  }
  .inner-search {
    padding: 2px 12px 2px;
    height: 32px;
  }
  .tree-wrap {
    padding: 5px 0 5px 5px;
    min-height: 400px;
    max-height: 700px;
    :deep(.bin-tree-node) {
      width: 100%;
    }
    :deep(.bin-tree-render-title) {
      flex: 1;
      width: auto;
      height: 24px;
    }
    overflow: auto;
  }
  .tree-inner {
    text-align: left;
    padding: 0 6px 6px;
  }
  .tree-bottom {
    border-top: 1px solid var(--v-g-border-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    height: 32px;
  }
  :deep(.bin-tree-render-title) {
    .bin-button {
      height: 24px;
      line-height: 1;
      + .bin-button {
        margin-left: 0;
      }
    }
  }
  :deep(.bin-input-wrapper.bin-input-group-with-append .bin-input-icon-clear) {
    right: 20px;
  }
  :deep(.search .bin-input-icon-clear .b-iconfont) {
    font-size: 14px;
  }
}
</style>
