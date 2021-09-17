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
          下方区域
        </template>
      </page-cube-wrapper>
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

export default {
  name: 'Cube',
  components: { SvgLoading, LinkNodeWrapper, CubeTableList, PageCubeWrapper, CubeHeader },
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
  }
}
</style>
