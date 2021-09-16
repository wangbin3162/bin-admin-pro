<template>
  <page-wrapper desc="连接节点组件，可拖拽配置节点数据，或者进行纯显示。" content-margin="0">
    <div class="link-node-demo">
      <page-cube-wrapper style="width: 100%;height:100%; background-color: #fff;">
        <template #left>
          <div class="datasource-wrapper">
            <div class="datasource-content">
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
              <b-ace-editor :model-value="JSON.stringify(stateTree,null,2)"></b-ace-editor>
            </div>
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
              dev
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
import LinkNodeWrapper from '@/components/Common/LinkNode/link-node-wrapper.vue'
import NodeList from '@/components/Common/LinkNode/node-list.vue'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import { Message } from 'bin-ui-next'
import { compileFlatState } from '@/components/Common/LinkNode/node-util'
import { generateId } from '@/utils/util'

export default {
  name: 'LinkNodeDemo',
  components: { NodeList, LinkNodeWrapper, PageCubeWrapper, PageWrapper },
  setup(props) {
    const idMock = [generateId().toString(), generateId().toString(), generateId().toString(), generateId().toString()]
    const tableList = ref([
      {
        id: idMock[0],
        title: 'root',
        tableName: 'root',
        fields: [
          { fieldName: 'col_1', fieldDesc: '名称', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '创建时间', type: 'date' },
        ],
      },
      {
        id: idMock[1],
        title: 'depart',
        tableName: 'depart',
        fields: [
          { fieldName: 'col_1', fieldDesc: '资源信息', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '创建时间', type: 'date' },
          { fieldName: 'col_3', fieldDesc: '创建部门', type: 'string' },
          { fieldName: 'col_4', fieldDesc: '总数', type: 'number' },
          { fieldName: 'col_5', fieldDesc: '成功条数', type: 'number' },
        ],
      },
      {
        id: idMock[2],
        title: 'analysis',
        tableName: 'analysis',
        fields: [
          { fieldName: 'col_1', fieldDesc: '国家', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '省', type: 'string' },
          { fieldName: 'col_3', fieldDesc: '市', type: 'string' },
          { fieldName: 'col_4', fieldDesc: '统计', type: 'number' },
        ],
      },
      {
        id: idMock[3],
        title: 'batch_job',
        tableName: 'batch_job',
        fields: [
          { fieldName: 'job_1', fieldDesc: '任务名称', type: 'string' },
          { fieldName: 'job_2', fieldDesc: '创建时间', type: 'date' },
          { fieldName: 'job_3', fieldDesc: '总数', type: 'number' },
          { fieldName: 'job_4', fieldDesc: '成功条数', type: 'number' },
        ],
      },
    ])

    // 树结构状态值
    const states = reactive({
      stateTree: {
        id: idMock[0],
        title: 'root',
        tableName: 'root',
        children: [
          {
            id: idMock[1],
            title: 'depart',
            tableName: 'depart',
            joinType: 'LEFT_OUTER_JOIN',
          },
          {
            id: idMock[2],
            title: 'analysis',
            tableName: 'analysis',
            joinType: 'INNER_JOIN',
          },
          {
            id: idMock[3],
            title: 'batch_job',
            tableName: 'batch_job',
            joinType: 'FULL_OUTER_JOIN',
          },
        ],
      },
      flatState: [], // 拉平的树结构
    })

    const allNodeTitle = computed(() => states.flatState.map(v => v.node.title))
    const dragging = ref(false)

    // 节点点击事件
    function handleNodeClick(nodeKey) {
      const node = states.flatState[nodeKey].node
      console.log(nodeKey, node)
      Message(`点击了${node.title}节点`)
    }

    // 节点移除事件
    function handleNodeRemove(nodeKey, parentNodeKey) {
      const node = states.flatState[nodeKey].node
      // 执行移除节点操作
      if (node.nodeKey === 0) { // 根节点删除
        states.stateTree = {}
        updateStateTree()
        return
      }
      const parentNode = states.flatState[parentNodeKey].node
      const index = parentNode.children.indexOf(node)
      parentNode.children.splice(index, 1)
      updateStateTree()
    }

    // 连接桩点击事件
    function handleLinkClick(nodeKey, parentNodeKey) {
      const node = states.flatState[nodeKey].node
      const parentNode = states.flatState[parentNodeKey].node
      console.log(nodeKey, parentNodeKey)
      Message(`点击了[${node.title}]-[${parentNode.title}]连接桩`)
    }

    // 拖拽增加节点
    function handleNodeDrop(parentNodeKey, tableId) {
      const parentNode = states.flatState[parentNodeKey].node
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
      states.stateTree = {
        id: table.id,
        title: table.title,
        tableName: table.tableName,
      }
      updateStateTree()
    }

    // 更新树数据
    function updateStateTree() {
      states.flatState = compileFlatState(states.stateTree)
    }

    updateStateTree()
    return {
      ...toRefs(states),
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
    height: 100%;
    width: 100%;
    background-color: #fafafa;
    position: relative;
    .datasource-content {
      height: 100%;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 10px;
      flex-direction: column;
      display: flex;
      position: relative;
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
