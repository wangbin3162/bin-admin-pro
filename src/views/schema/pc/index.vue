<template>
  <div class="bi-pc-container">
    <pc-header
      v-model="dashboard.dashboardName"
      :page-status="dashboard"
      back-url="/dashboardDemo"
      @save="handleSave"
      @back="handleBack"
    ></pc-header>
    <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
      <svg-loading name="loading02" />
    </div>
    <div v-else class="dashboard-page">
      <div class="page-left">
        <components-bar></components-bar>
        <div class="schema-canvas-wrap">
          <div class="editor-container">
            <div class="editor-container-main">
              <div flex="box:mean" v-if="loading">
                <b-ace-editor :model-value="JSON.stringify({dimensionTree},null,2)" />
                <b-ace-editor :model-value="JSON.stringify({measureTree},null,2)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-right">
        <page-config-panel v-if="curComponentIndex===-1"></page-config-panel>
        <setting-config-panel v-else></setting-config-panel>
      </div>
    </div>
  </div>
</template>

<script>
import { provide, reactive, ref, toRefs } from 'vue'
import usePcPage from '@/views/schema/pc/hooks/use-pc-page'
import useSchemaStore from '@/views/schema/pc/hooks/use-schema-store'
import PcHeader from '@/views/schema/pc/src/pc-header.vue'
import ComponentsBar from '@/views/schema/pc/src/components-bar.vue'
import PageConfigPanel from '@/views/schema/pc/src/page-config/index.vue'
import SettingConfigPanel from '@/views/schema/pc/src/setting-config/index.vue'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'
import './styles/index.styl'
import { getSchema } from '@/api/modules/bi-cube.api'
import { throwError } from '@/utils/util'
import { compileFlatState } from '@/components/Service/LinkNode/node-util'

export default {
  name: 'Pc',
  components: { SvgLoading, SettingConfigPanel, PageConfigPanel, ComponentsBar, PcHeader },
  setup(props, { emit }) {
    const pageStatus = usePcPage()
    const $store = useSchemaStore()
    const status = reactive({
      loading: false,
      dimensionTree: {}, // 维度树
      dimensionTreeFlats: [], // 维度树拉平
      dimensionFields: [],
      measureTree: {}, // 度量树
      measureTreeFlats: [], // 度量树拉平
      measureFields: [],
    })

    // 更新字段数据
    const updateFieldState = (cubeSchema) => {
      const { dimension, measure } = cubeSchema || {}
      // 维度、度量树
      status.dimensionTree = dimension || { title: '维度', nodeType: 'root', children: [] }
      status.measureTree = measure || { title: '度量', nodeType: 'root', children: [] }
      status.dimensionTreeFlats = compileFlatState(status.dimensionTree)
      status.measureTreeFlats = compileFlatState(status.measureTree)
      status.dimensionFields = status.dimensionTreeFlats.filter(v => v.node.nodeType === 'attribute')
      status.measureFields = status.measureTreeFlats.filter(v => v.node.nodeType === 'attribute')
    }
    // 初始化数据表
    const initData = async () => {
      status.loading = true
      try {
        const { pageId, workspaceId, sourceId } = pageStatus.dashboard
        const { cubeSchema } = await getSchema({ workspaceId, id: pageId || sourceId })
        updateFieldState(cubeSchema)
      } catch (e) {
        throwError('schema/index', e)
      }
      status.loading = false
    }

    initData()

    provide('Schema', {
      pageStatus,
      status,
    })
    return {
      dev: true,
      debugVisible: ref(false),
      ...pageStatus,
      ...$store,
      ...toRefs(status),
    }
  },
}
</script>
