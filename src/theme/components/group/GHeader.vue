<template>
  <b-collapse-wrap title="导航栏" shadow="none" collapse :model-value="false">
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
            label="导航栏背景颜色[vHeaderBg]"
            :defaultVal="Theme.vHeaderBg"
            v-model="themeConfigRef.vHeaderBg"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="导航栏文字颜色[vHeaderTextColor]"
            :defaultVal="Theme.vHeaderTextColor"
            v-model="themeConfigRef.vHeaderTextColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="导航栏边框颜色[vHeaderBorderColor]"
            :defaultVal="Theme.vHeaderBorderColor"
            v-model="themeConfigRef.vHeaderBorderColor"
            :colors="ThemeBorderColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="导航栏高度[vHeaderHeight]"
            :defaultVal="Theme.vHeaderHeight"
            v-model="themeConfigRef.vHeaderHeight"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="操作按钮大小[vHeaderTriggerSize]"
            :defaultVal="Theme.vHeaderTriggerSize"
            v-model="themeConfigRef.vHeaderTriggerSize"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="按钮Radius[vHeaderTriggerRadius]"
            :defaultVal="Theme.vHeaderTriggerRadius"
            v-model="themeConfigRef.vHeaderTriggerRadius"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="按钮边框色[vHeaderTrigggerBorderColor]"
            :defaultVal="Theme.vHeaderTriggerBorderColor"
            v-model="themeConfigRef.vHeaderTriggerBorderColor"
            :colors="ThemeBorderColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="按钮悬停背景色[vHeaderTriggerHoverBgColor]"
            :defaultVal="Theme.vHeaderTriggerHoverBgColor"
            v-model="themeConfigRef.vHeaderTriggerHoverBgColor"
            :colors="ThemeBgColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
      </b-row>
    </div>
  </b-collapse-wrap>
</template>

<script setup>
import {
  Theme,
  ThemeMenuColors,
  ThemeTextColors,
  ThemeBorderColors,
  themeConfigRef,
  ThemeBgColors,
} from '@/theme'
import GroupPanel from '../src/GroupPanel.vue'

defineOptions({
  name: 'GHeader',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
