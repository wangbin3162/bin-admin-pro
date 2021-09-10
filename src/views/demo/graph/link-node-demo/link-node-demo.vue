<template>
  <page-wrapper desc="连接节点组件，可拖拽配置节点数据，或者进行纯显示。" content-margin="0">
    <div class="link-node-wrapper">
      <page-cube-wrapper style="width: 100%;height:100%; background-color: #fff;">
        <template #left>left</template>
        <template #default>top</template>
        <template #draggable>draggable</template>
      </page-cube-wrapper>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import PageCubeWrapper from '@/components/Common/Page/page-cube-wrapper.vue'

export default {
  name: 'link-node-demo.vue',
  components: { PageCubeWrapper, PageWrapper },
}
</script>

<style scoped lang="stylus">
.link-node-wrapper {
  min-height: 200px;
  height: calc(100vh - 270px);
  border-bottom: 1px solid #eee;
}
</style>
