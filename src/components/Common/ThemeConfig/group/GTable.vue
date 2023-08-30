<template>
  <b-collapse-wrap title="Table表格" shadow="none" collapse :model-value="false">
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
            label="头部背景颜色[vTableHeaderBg]"
            :defaultVal="Theme.vTableHeaderBg"
            v-model="themeConfigRef.vTableHeaderBg"
            :colors="ThemeFillColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="头部文字颜色[vTableHeaderText]"
            :defaultVal="Theme.vTableHeaderText"
            v-model="themeConfigRef.vTableHeaderText"
            :colors="ThemeTextColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
      </b-row>
    </div>
  </b-collapse-wrap>
</template>

<script setup>
import { Theme, themeConfigRef, ThemeFillColors, ThemeTextColors } from '@/hooks/theme'
import GroupPanel from '../src/GroupPanel.vue'

defineOptions({
  name: 'GTable',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
