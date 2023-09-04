<template>
  <b-row :gutter="16">
    <b-col span="6">
      <GroupPanel
        label="系统主颜色[binColorPrimary]"
        :defaultVal="Theme.binColorPrimary"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorPrimary"
        type="color"
      ></GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="成功颜色[binColorSuccess]"
        :defaultVal="Theme.binColorSuccess"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorSuccess"
        type="color"
      ></GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="警告颜色[binColorWarning]"
        :defaultVal="Theme.binColorWarning"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorWarning"
        type="color"
      ></GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="危险颜色[binColorDanger]"
        :defaultVal="Theme.binColorDanger"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorDanger"
        type="color"
      ></GroupPanel>
    </b-col>
  </b-row>
</template>

<script setup>
import { Theme, ThemeMainColors, themeConfigRef } from '@/theme'
import GroupPanel from './GroupPanel.vue'
// 主题颜色配置面板
defineOptions({
  name: 'ColorsPanel',
})
</script>

<style scoped></style>
