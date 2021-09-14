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
                @start="dragging=true"
                @end="dragging=false"
              ></node-list>
              <b-ace-editor :model-value="JSON.stringify(nodeData,null,2)"></b-ace-editor>
            </div>
          </div>
        </template>
        <template #default>
          <div class="p24" style="background-color: #f2f2f2;height: 100%;overflow: auto;">
            <link-node-wrapper
              :dragging="dragging"
              :data="nodeData"
              empty-text="请从左侧拖拽数据表开始创建"
              @node-click="handleNodeClick"
              @node-drop="handleNodeDrop"
              @link-click="handleLinkClick"
              @update-flatState="handleUpdateFlatState"
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
import { ref } from 'vue'
import { Message } from 'bin-ui-next'

export default {
  name: 'link-node-demo.vue',
  components: { NodeList, LinkNodeWrapper, PageCubeWrapper, PageWrapper },
  setup(props) {
    const tableList = ref([
      {
        id: 0,
        title: 'root',
        fields: [
          { fieldName: 'col_1', fieldDesc: '名称', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '创建时间', type: 'date' },
        ],
      },
      {
        id: 1,
        title: 'depart',
        fields: [
          { fieldName: 'col_1', fieldDesc: '资源信息', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '创建时间', type: 'date' },
          { fieldName: 'col_3', fieldDesc: '创建部门', type: 'string' },
          { fieldName: 'col_4', fieldDesc: '总数', type: 'number' },
          { fieldName: 'col_5', fieldDesc: '成功条数', type: 'number' },
        ],
      },
      {
        id: 2,
        title: 'analysis',
        fields: [
          { fieldName: 'col_1', fieldDesc: '国家', type: 'string' },
          { fieldName: 'col_2', fieldDesc: '省', type: 'string' },
          { fieldName: 'col_3', fieldDesc: '市', type: 'string' },
          { fieldName: 'col_4', fieldDesc: '统计', type: 'number' },
        ],
      },
      {
        id: 3,
        title: 'batch_job',
        fields: [
          { fieldName: 'job_1', fieldDesc: '任务名称', type: 'string' },
          { fieldName: 'job_2', fieldDesc: '创建时间', type: 'date' },
          { fieldName: 'job_3', fieldDesc: '总数', type: 'number' },
          { fieldName: 'job_4', fieldDesc: '成功条数', type: 'number' },
        ],
      },
    ])

    const nodeData = ref({
      title: 'root',
      children: [
        // { title: 'batch_job', children: [{ title: 'job1' }, { title: 'job2' }] },
        // { title: 'depart', children: [{ title: 'depart_child1' }] },
        { title: 'analysis' },
      ],
    })
    const allNodeTitle = ref([])
    const dragging = ref(false)

    // flatState 更新事件
    function handleUpdateFlatState(flatState) {
      allNodeTitle.value = flatState.filter(v => !v.node.isEmpty).map(v => v.node.title)
    }

    function handleNodeClick(node, flatState) {
      console.log(node, flatState)
      Message(`点击了${node.title}节点`)
    }

    function handleLinkClick(node, parentNode, flatState) {
      console.log(node, parentNode, flatState)
      Message(`点击了[${node.title}]-[${parentNode.title}]连接桩`)
    }

    function handleNodeDrop(node, parentNode, tableId) {
      console.log(node, parentNode, tableId)
    }


    return {
      // 左侧列表
      tableList,
      allNodeTitle,
      // 右侧操作区
      dragging,
      nodeData,
      handleNodeClick,
      handleLinkClick,
      handleUpdateFlatState,
      handleNodeDrop,
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
