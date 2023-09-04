<template>
  <b-collapse-wrap title="Page分页" shadow="none" collapse :model-value="false">
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
            label="分页按钮边框颜色[vPageBorderColor]"
            :defaultVal="Theme.vPageBorderColor"
            v-model="themeConfigRef.vPageBorderColor"
            :colors="ThemeBorderColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="分页按钮背景颜色[vPageBg]"
            :defaultVal="Theme.vPageBg"
            v-model="themeConfigRef.vPageBg"
            :colors="ThemeBgColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="分页按钮背景悬停颜色[vPageHoverBg]"
            :defaultVal="Theme.vPageHoverBg"
            v-model="themeConfigRef.vPageHoverBg"
            :colors="ThemeBgColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="分页按钮背景active颜色[vPageActiveBg]"
            :defaultVal="Theme.vPageActiveBg"
            v-model="themeConfigRef.vPageActiveBg"
            :colors="ThemeBgColors"
          ></GroupPanel>
        </b-col>
      </b-row>
    </div>
  </b-collapse-wrap>
</template>

<script setup>
import { Theme, themeConfigRef, ThemeBorderColors, ThemeBgColors } from '@/theme'
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
