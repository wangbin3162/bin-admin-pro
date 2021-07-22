<template>
  <div class="base-tree" :style="{width}" ref="treeEl">
    <div class="base-tree-header">
      <span class="base-title">{{ treeTitle }}</span>
      <div class="base-ctrl">
        <div class="search">
          <b-input v-if="showTopSearch" size="small" search v-model="query" placeholder="搜索" @search="handleFilter"/>
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
    <div class="tree-wrap" v-loading="loading">
      <b-scrollbar>
        <div class="inner-search" v-if="showInnerSearch">
          <b-input size="small" search v-model="query" placeholder="搜索" @search="handleFilter"/>
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
          ></b-tree>
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script>
import useTree from '@/hooks/service/useTree'
import { computed, ref, watch } from 'vue'

export default {
  name: 'BaseTree',
  props: {
    width: {
      type: String,
      default: '280px'
    },
    treeTitle: {
      type: String
    },
    filterPosition: {
      type: String,
      default: 'top'
    },
    lock: Boolean,
    fetch: {
      type: [Function, Array]
    },
    params: {
      type: Object
    },
    render: Function,
    showCheckbox: {
      type: Boolean
    },
    checkStrictly: {
      type: Boolean
    },
    showFilter: {
      type: Boolean
    },
    titleKey: {
      type: String,
      default: 'text'
    },
    defaultExpand: {
      type: Boolean
    },
    expandKeys: {
      type: Array,
      default: () => [0]
    }
  },
  emits: ['select-change', 'check-change', 'command'],
  setup(props, ctx) {
    const treeEl = ref(null)
    const showTopSearch = computed(() => props.showFilter && props.filterPosition === 'top')
    const showInnerSearch = computed(() => props.showFilter && props.filterPosition === 'inner')
    const {
      treeRef,
      loading,
      query,
      treeData,
      getTreeData,
      reloadTree,
      reloadTreeWithCheck,
      handleSelect,
      handleChecked,
      handleFilter,
      filterNode
    } = useTree(props.fetch, props.params, ctx, props.titleKey)

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
      ctx.emit('command', name)
    }

    watch(() => props.fetch, () => {
      getTreeData().then(() => {
        treeRef.value && treeRef.value.setExpand(props.expandKeys)
      })
    }, { immediate: true })
    return {
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
      filterNode
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/stylus/base/var.styl"
.base-tree {
  flex-shrink: 0;
  flex-grow: 0;
  min-height: 300px;
  max-height: 768px;
  background: #fff;
  border-radius: 2px;
  overflow: hidden;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    border-bottom: $border-base;
    height: 45px;
    line-height: 1;
    .base-title {
      color: $color-text-primary;
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
    height: calc(100% - 42px);
  }
}
</style>
