<template>
  <div class="bi-pc-container">
    <pc-header
      v-model="dashboard.dashboardName"
      :page-status="dashboard"
      back-url="/dashboardDemo"
      @save="handleSave"
      @back="handleBack"
    ></pc-header>
  </div>
</template>

<script>
import PcHeader from '@/views/schema/pc/src/pc-header.vue'
import { ref } from 'vue'
import usePcPage from '@/views/schema/pc/hooks/use-pc-page'

export default {
  name: 'Pc',
  components: { PcHeader },
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

</style>
