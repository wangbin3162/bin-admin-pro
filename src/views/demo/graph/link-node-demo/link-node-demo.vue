<template>
  <page-wrapper desc="连接节点组件，可拖拽配置节点数据，或者进行纯显示。" content-margin="0">
    <div class="link-node-demo">
      <page-cube-wrapper style="width: 100%;height:100%; background-color: #fff;">
        <template #left>left</template>
        <template #default>
          <div class="p24" style="background-color: #f2f2f2;height: 100%;">
            <link-node-wrapper
              :data="nodeData"
              empty-text="请从左侧拖拽数据表开始创建"
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
import LinkNodeWrapper from '@/components/Service/LinkNode/link-node-wrapper.vue'

export default {
  name: 'link-node-demo.vue',
  components: { LinkNodeWrapper, PageCubeWrapper, PageWrapper },
  data() {
    return {
      nodeData: {
        title: 'root',
        children: [
          // { title: 'batch_job', children: [{ title: 'job1' }, { title: 'job2' }] },
          // { title: 'depart', children: [{ title: 'depart_child' }] },
          { title: 'analysis' },
        ],
      },
    }
  },
}
</script>

<style scoped lang="stylus">
.link-node-demo {
  min-height: 200px;
  height: calc(100vh - 270px);
  border-bottom: 1px solid #eee;
}
</style>
