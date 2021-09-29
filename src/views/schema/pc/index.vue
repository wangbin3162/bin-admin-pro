<template>
  <div class="bi-pc-container">
    <pc-header
      v-model="dashboard.dashboardName"
      :page-status="dashboard"
      back-url="/dashboardDemo"
      @save="handleSave"
      @back="handleBack"
    ></pc-header>
    <div class="dashboard-page">
      <div class="page-left">
        <components-bar></components-bar>
      </div>
      <div class="page-right"></div>
    </div>
  </div>
</template>

<script>
import PcHeader from '@/views/schema/pc/src/pc-header.vue'
import { ref } from 'vue'
import usePcPage from '@/views/schema/pc/hooks/use-pc-page'
import ComponentsBar from '@/views/schema/pc/src/components-bar.vue'

export default {
  name: 'Pc',
  components: { ComponentsBar, PcHeader },
  setup(props, { emit }) {
    const pageStatus = usePcPage()
    return {
      dev: true,
      debugVisible: ref(false),
      ...pageStatus,
    }
  },
}
</script>

<style scoped lang="stylus">
.bi-pc-container {
  height: 100vh;
  width: 100%;
  position: relative;
}
.dashboard-page {
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  .page-left {
    width: calc(100% - 400px);
    height: 100%;
  }
  .page-right {
    width: 400px;
    background: #2b3551;
    height: 100%;
  }
}
</style>
