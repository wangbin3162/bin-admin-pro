<template>
  <div class="bi-cube-container">
    <cube-header
      v-model="dataset.datasetName"
      back-url="/datasetDemo"
      @save="handleSave"
      @back="handleBack"
    />
    <div class="bi-cube-wrapper">
      <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
        <svg-loading name="loading02"></svg-loading>
      </div>
      <page-cube-wrapper v-else class="full-wrapper">
        <template #left>
          <cube-table-list />
        </template>
        <template #default>
          <div class="default-wrapper">
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
        <template #draggable>
          <div class="table-header">
            <div class="header-tabs">
              <span class="tab active">数据预览</span>
            </div>
            <div class="right-col">
              <b-button type="primary" size="mini" icon="reload">刷新预览</b-button>
            </div>
          </div>
          <div class="preview-data-content">
            <div class="preview-data-left">
              <div class="cube-field-panel">
                <b-scrollbar>
                  <div class="cube-tree">
                    <b-tree
                      :data="fieldTree"
                      :render="renderContent"
                      ref="tree"
                      default-expand
                      lock-select
                    ></b-tree>
                  </div>
                </b-scrollbar>
              </div>
            </div>
            <div class="preview-data-right">
              preview-data-right
            </div>
          </div>
        </template>
      </page-cube-wrapper>

      <!--节点编辑-->
      <cube-node-edit ref="nodeEditRef" @save="saveSelectedFields"></cube-node-edit>
      <cube-link-edit ref="linkEditRef" @save="saveJoinKeys"></cube-link-edit>
    </div>
  </div>
</template>

<script>
import { provide } from 'vue'
import useCubePage from '@/views/schema/cube/hooks/use-cube-page'
import useSchema from '@/views/schema/cube/hooks/use-schema'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'
import PageCubeWrapper from '@/components/Common/Page/page-cube-wrapper.vue'
import LinkNodeWrapper from '@/components/Service/LinkNode/index.vue'
import CubeHeader from '@/views/schema/cube/src/cube-header.vue'
import CubeTableList from '@/views/schema/cube/src/cube-table-list.vue'
import CubeNodeEdit from '@/views/schema/cube/src/cube-node-edit.vue'
import CubeLinkEdit from '@/views/schema/cube/src/cube-link-edit.vue'

export default {
  name: 'Cube',
  components: { CubeLinkEdit, CubeNodeEdit, SvgLoading, LinkNodeWrapper, CubeTableList, PageCubeWrapper, CubeHeader },
  setup() {
    const pageStatus = useCubePage()
    const schemaStatus = useSchema(pageStatus.dataset)

    provide('BiCube', {
      schemaStatus,
      pageStatus,
    })

    return {
      ...pageStatus,
      ...schemaStatus,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
$cube-base-border = 1px solid #dcdbde;
$cube-base-border-light = 1px solid #d8d8d8;
.bi-cube-container {
  height: 100vh;
  width: 100%;
  position: relative;
  .bi-cube-wrapper {
    position: relative;
    height: calc(100% - 50px);
    .full-wrapper {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
    .default-wrapper {
      padding: 24px;
      background-color: #f2f2f2;
      height: 100%;
      overflow: auto;
    }
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      padding: 0 20px;
      background-color: #fff;
      min-width: 1000px;
      border-bottom: $cube-base-border;
      border-top: $cube-base-border;
      .header-tabs {
        display: flex;
        height: 100%;
        .tab {
          position: relative;
          height: 100%;
          line-height: 48px;
          color: getColor();
          &.active:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            background-color: getColor();
          }
        }
      }
    }
    .preview-data-content {
      display: flex;
      height: calc(100% - 48px);
      overflow: auto;
      .preview-data-left {
        width: 260px;
      }
      .cube-field-panel {
        width: 260px;
        height: 100%;
        background-color: #fff;
        color: #191919;
        border-right: $cube-base-border-light;
        .cube-tree {
          :deep(.bin-tree) {
            > .bin-tree-children {
              padding: 8px 5px;
              + .bin-tree-children {
                border-top: $cube-base-border-light;
              }
            }
            .setting-action {
              display: none;
            }
            .bin-tree-render-title {
              .D > i {
                color: getColor();
              }
              .M > i {
                color: #52c41a;
              }
              &:hover .setting-action {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
