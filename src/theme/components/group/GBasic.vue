<template>
  <b-collapse-wrap title="主色调" shadow="none" collapse :model-value="false">
    <div class="theme-config-panel">
      <b-row :gutter="16">
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
        <b-col span="6"></b-col>
      </b-row>

      <colors-panel></colors-panel>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="文字颜色[vGTextColor-1]"
            :defaultVal="Theme['vGTextColor-1']"
            v-model="themeConfigRef['vGTextColor-1']"
            :colors="ThemeTextColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字颜色[vGTextColor-2]"
            :defaultVal="Theme['vGTextColor-2']"
            v-model="themeConfigRef['vGTextColor-2']"
            :colors="ThemeTextColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字颜色[vGTextColor-3]"
            :defaultVal="Theme['vGTextColor-3']"
            v-model="themeConfigRef['vGTextColor-3']"
            :colors="ThemeTextColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字颜色[vGTextColor-4]"
            :defaultVal="Theme['vGTextColor-4']"
            v-model="themeConfigRef['vGTextColor-4']"
            :colors="ThemeTextColors"
            type="color"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="填充颜色[vGFillColor-1]"
            :defaultVal="Theme['vGFillColor-1']"
            v-model="themeConfigRef['vGFillColor-1']"
            :colors="ThemeFillColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="填充颜色[vGFillColor-2]"
            :defaultVal="Theme['vGFillColor-2']"
            v-model="themeConfigRef['vGFillColor-2']"
            :colors="ThemeFillColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="填充颜色[vGFillColor-3]"
            :defaultVal="Theme['vGFillColor-3']"
            v-model="themeConfigRef['vGFillColor-3']"
            :colors="ThemeFillColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="填充颜色[vGFillColor-4]"
            :defaultVal="Theme['vGFillColor-4']"
            v-model="themeConfigRef['vGFillColor-4']"
            :colors="ThemeFillColors"
            type="color"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="背景颜色[vGBgColor-1]"
            :defaultVal="Theme['vGBgColor-1']"
            v-model="themeConfigRef['vGBgColor-1']"
            :colors="ThemeBgColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="背景颜色[vGBgColor-2]"
            :defaultVal="Theme['vGBgColor-2']"
            v-model="themeConfigRef['vGBgColor-2']"
            :colors="ThemeBgColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="背景颜色[vGBgColor-3]"
            :defaultVal="Theme['vGBgColor-3']"
            v-model="themeConfigRef['vGBgColor-3']"
            :colors="ThemeBgColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="背景颜色[vGBgColor-4]"
            :defaultVal="Theme['vGBgColor-4']"
            v-model="themeConfigRef['vGBgColor-4']"
            :colors="ThemeBgColors"
            type="color"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="系统背景色[vGBgColor]"
            :defaultVal="Theme.vGBgColor"
            v-model="themeConfigRef.vGBgColor"
            :colors="ThemeBgColors"
            type="color"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="系统主文字颜色[vGTextColor]"
            :defaultVal="Theme.vGTextColor"
            v-model="themeConfigRef.vGTextColor"
            :colors="ThemeTextColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="边框颜色[vGBorderColor]"
            :defaultVal="Theme.vGBorderColor"
            v-model="themeConfigRef.vGBorderColor"
            :colors="ThemeBorderColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="content内容区域背景色[vContentBg]"
            :defaultVal="Theme.vContentBg"
            v-model="themeConfigRef.vContentBg"
            :colors="ThemeBgColors"
          ></GroupPanel>
        </b-col>
      </b-row>
    </div>
  </b-collapse-wrap>
</template>

<script setup>
import {
  Theme,
  ThemeFillColors,
  ThemeBorderColors,
  ThemeBgColors,
  ThemeTextColors,
  themeConfigRef,
} from '@/theme'

import GroupPanel from '../src/GroupPanel.vue'
import ColorsPanel from '../src/ColorsPanel.vue'

defineOptions({
  name: 'GBasic',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
