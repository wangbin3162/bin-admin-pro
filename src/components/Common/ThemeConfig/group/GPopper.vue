<template>
  <b-collapse-wrap title="Popper弹层" shadow="none" collapse :model-value="false">
    <div class="theme-config-panel">
      <b-row :gutter="16">
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="Tooltip内边距[vPopperTooltipPadding]"
            :defaultVal="Theme.vPopperTooltipPadding"
            v-model="themeConfigRef.vPopperTooltipPadding"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="弹层内边距[vPopperPadding]"
            :defaultVal="Theme.vPopperPadding"
            v-model="themeConfigRef.vPopperPadding"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="弹层选项圆角[vPopperRadius]"
            :defaultVal="Theme.vPopperRadius"
            v-model="themeConfigRef.vPopperRadius"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="弹层选项下边距[vPopperItemMarginBottom]"
            :defaultVal="Theme.vPopperItemMarginBottom"
            v-model="themeConfigRef.vPopperItemMarginBottom"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>
    </div>
  </b-collapse-wrap>
</template>

<script setup>
import { Theme, themeConfigRef } from '@/hooks/theme'
import GroupPanel from '../src/GroupPanel.vue'

defineOptions({
  name: 'GPopper',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
