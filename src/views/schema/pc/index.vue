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
      <div class="page-right">
        <page-config-panel></page-config-panel>
      </div>
    </div>
  </div>
</template>

<script>
import PcHeader from '@/views/schema/pc/src/pc-header.vue'
import { ref } from 'vue'
import usePcPage from '@/views/schema/pc/hooks/use-pc-page'
import ComponentsBar from '@/views/schema/pc/src/components-bar.vue'
import PageConfigPanel from '@/views/schema/pc/src/page-config/index.vue'
import './styles/index.styl'

export default {
  name: 'Pc',
  components: { PageConfigPanel, ComponentsBar, PcHeader },
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
