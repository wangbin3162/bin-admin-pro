<template>
  <page-wrapper desc="连接节点组件，可拖拽配置节点数据，或者进行纯显示。" content-margin="0">
    <div class="link-node-demo">
      <page-cube-wrapper style="width: 100%;height:100%; background-color: #fff;">
        <template #left>
          <div class="datasource-wrapper">
            <b-tabs :model-value="'file'" :data="[{key:'file',title:'数据集表信息'}]"></b-tabs>
            <div class="datasource-table-search">
              <b-icon name="search" type="button"></b-icon>
              <input placeholder="搜索数据表/文件" type="text" value="">
              <b-icon name="redo" type="button"></b-icon>
            </div>
            <node-list
              :data="tableList"
              :all-node-title="allNodeTitle"
              :root-node="stateTree"
              @start="dragging=true"
              @end="dragging=false"
            ></node-list>
          </div>
        </template>
        <template #default>
          <div class="p24" style="background-color: #f2f2f2;height: 100%;overflow: auto;">
            <link-node-wrapper
              :dragging="dragging"
              :data="stateTree"
              @node-click="handleNodeClick"
              @node-remove="handleNodeRemove"
              @node-drop="handleNodeDrop"
              @link-click="handleLinkClick"
              @empty-drop="handleEmptyDrop"
              :dev="true"
            ></link-node-wrapper>
          </div>
        </template>
      </page-cube-wrapper>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import PageCubeWrapper from '@/components/Common/Page/page-cube-wrapper.vue'
import LinkNodeWrapper from '@/components/Service/LinkNode/index.vue'
import NodeList from '@/components/Service/LinkNode/node-list.vue'
import { computed, reactive, ref, toRefs } from 'vue'
import { Message } from 'bin-ui-next'
import { compileFlatState } from '@/components/Service/LinkNode/node-util'
import { getTableLinks, getTableList } from '@/views/demo/graph/link-node-demo/data'

export default {
  name: 'LinkNodeDemo',
  components: { NodeList, LinkNodeWrapper, PageCubeWrapper, PageWrapper },
  setup() {
    const tableList = ref([])
    // 树结构状态值
    const status = reactive({
      stateTree: {},
      flatState: [], // 拉平的树结构
    })
    const dragging = ref(false)

    const allNodeTitle = computed(() => status.flatState.map(v => v.node.title))

    // 节点点击事件
    function handleNodeClick(nodeKey) {
      const node = status.flatState[nodeKey].node
      console.log(nodeKey, node)
      Message(`点击了${node.title}节点`)
    }

    // 节点移除事件
    function handleNodeRemove(nodeKey, parentNodeKey) {
      const node = status.flatState[nodeKey].node
      // 执行移除节点操作
      if (node.nodeKey === 0) { // 根节点删除
        status.stateTree = {}
        updateStateTree()
        return
      }
      const parentNode = status.flatState[parentNodeKey].node
      const index = parentNode.children.indexOf(node)
      parentNode.children.splice(index, 1)
      updateStateTree()
    }

    // 连接桩点击事件
    function handleLinkClick(nodeKey, parentNodeKey) {
      const node = status.flatState[nodeKey].node
      const parentNode = status.flatState[parentNodeKey].node
      console.log(nodeKey, parentNodeKey)
      Message(`点击了[${node.title}]-[${parentNode.title}]连接桩`)
    }

    // 拖拽增加节点
    function handleNodeDrop(parentNodeKey, tableId) {
      const parentNode = status.flatState[parentNodeKey].node
      const table = tableList.value.find(v => v.id.toString() === tableId)
      // 执行新增节点操作
      const children = parentNode.children || []
      children.push({
        id: table.id,
        title: table.title,
        tableName: table.tableName,
      })
      parentNode.children = children
      updateStateTree()
    }

    // 增加根节点
    function handleEmptyDrop(tableId) {
      const table = tableList.value.find(v => v.id.toString() === tableId)
      status.stateTree = {
        id: table.id,
        title: table.title,
        tableName: table.tableName,
      }
      updateStateTree()
    }

    // 获取表列表
    getTableList().then(res => {
      tableList.value = res.data
    })

    // 获取已配的节点信息
    getTableLinks().then(res => {
      status.stateTree = res.data
      updateStateTree()
    })

    // 更新树数据
    function updateStateTree() {
      status.flatState = compileFlatState(status.stateTree)
    }

    return {
      ...toRefs(status),
      // 左侧列表
      tableList,
      allNodeTitle,
      // 右侧操作区
      dragging,
      handleNodeClick,
      handleNodeRemove,
      handleNodeDrop,
      handleLinkClick,
      handleEmptyDrop,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
@import "../../../../assets/stylus/base/mixins.styl"
.link-node-demo {
  min-height: 200px;
  height: calc(100vh - 270px);
  border-bottom: 1px solid #eee;
  .datasource-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #fafafa;
    padding-bottom: 10px;
    .datasource-table-search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      margin: 0 10px 0;
      > input {
        background-color: #fafafa;
        border: none;
        width: 185px;
        outline: none;
        height: 32px;
        padding: 4px 0 4px 5px;
        color: #262626;
        font-size: 12px;
        line-height: 32px;
      }
    }
    .datasource-content-list {
      color: #313132;
      padding: 12px 5px 5px;
      flex: 1 1 auto;
      overflow-y: auto;
      height: 0;
    }
  }
}
</style>
