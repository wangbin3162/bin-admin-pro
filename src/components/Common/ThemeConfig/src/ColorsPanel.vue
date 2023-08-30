<template>
  <b-row :gutter="16">
    <b-col span="6">
      <GroupPanel
        label="系统主颜色[binColorPrimary]"
        :defaultVal="Theme.binColorPrimary"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorPrimary"
        type="color"
      >
        <ul class="color-list">
          <li style="background-color: var(--bin-color-primary-active)" title="active" />
          <li style="background-color: var(--bin-color-primary)" title="default" />
          <li style="background-color: var(--bin-color-primary-light1)" title="light1" />
          <li style="background-color: var(--bin-color-primary-light2)" title="light2" />
          <li style="background-color: var(--bin-color-primary-light3)" title="light3" />
          <li style="background-color: var(--bin-color-primary-light4)" title="light4" />
          <li style="background-color: var(--bin-color-primary-light5)" title="light5" />
          <li style="background-color: var(--bin-color-primary-light6)" title="light6" />
        </ul>
      </GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="成功颜色[binColorSuccess]"
        :defaultVal="Theme.binColorSuccess"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorSuccess"
        type="color"
      >
        <ul class="color-list">
          <li style="background-color: var(--bin-color-success-active)" title="active" />
          <li style="background-color: var(--bin-color-success)" title="default" />
          <li style="background-color: var(--bin-color-success-light1)" title="light1" />
          <li style="background-color: var(--bin-color-success-light2)" title="light2" />
          <li style="background-color: var(--bin-color-success-light3)" title="light3" />
          <li style="background-color: var(--bin-color-success-light4)" title="light4" />
          <li style="background-color: var(--bin-color-success-light5)" title="light5" />
          <li style="background-color: var(--bin-color-success-light6)" title="light6" />
        </ul>
      </GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="警告颜色[binColorWarning]"
        :defaultVal="Theme.binColorWarning"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorWarning"
        type="color"
      >
        <ul class="color-list">
          <li style="background-color: var(--bin-color-warning-active)" title="active" />
          <li style="background-color: var(--bin-color-warning)" title="default" />
          <li style="background-color: var(--bin-color-warning-light1)" title="light1" />
          <li style="background-color: var(--bin-color-warning-light2)" title="light2" />
          <li style="background-color: var(--bin-color-warning-light3)" title="light3" />
          <li style="background-color: var(--bin-color-warning-light4)" title="light4" />
          <li style="background-color: var(--bin-color-warning-light5)" title="light5" />
          <li style="background-color: var(--bin-color-warning-light6)" title="light6" />
        </ul>
      </GroupPanel>
    </b-col>
    <b-col span="6">
      <GroupPanel
        label="危险颜色[binColorDanger]"
        :defaultVal="Theme.binColorDanger"
        :colors="ThemeMainColors"
        v-model="themeConfigRef.binColorDanger"
        type="color"
      >
        <ul class="color-list">
          <li style="background-color: var(--bin-color-danger-active)" title="active" />
          <li style="background-color: var(--bin-color-danger)" title="default" />
          <li style="background-color: var(--bin-color-danger-light1)" title="light1" />
          <li style="background-color: var(--bin-color-danger-light2)" title="light2" />
          <li style="background-color: var(--bin-color-danger-light3)" title="light3" />
          <li style="background-color: var(--bin-color-danger-light4)" title="light4" />
          <li style="background-color: var(--bin-color-danger-light5)" title="light5" />
          <li style="background-color: var(--bin-color-danger-light6)" title="light6" />
        </ul>
      </GroupPanel>
    </b-col>
  </b-row>
</template>

<script setup>
import { Theme, ThemeMainColors, themeConfigRef } from '@/hooks/theme'
import GroupPanel from './GroupPanel.vue'
// 主题颜色配置面板
defineOptions({
  name: 'ColorsPanel',
})
</script>

<style scoped>
.color-list {
  padding-top: 6px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > li {
    margin-right: 4px;
    padding: 4px;
    border-radius: 2px;
    width: 22px;
    height: 22px;
  }
}
</style>
