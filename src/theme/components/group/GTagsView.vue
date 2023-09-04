<template>
  <b-collapse-wrap title="多页签栏" shadow="none" collapse :model-value="false">
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
            label="多页签背景色[vTagsBgColor]"
            :defaultVal="Theme.vTagsBgColor"
            v-model="themeConfigRef.vTagsBgColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="多页签边框色[vTagsBorderColor]"
            :defaultVal="Theme.vTagsBorderColor"
            v-model="themeConfigRef.vTagsBorderColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="多页签高度[vTagsHeight]"
            :defaultVal="Theme.vTagsHeight"
            v-model="themeConfigRef.vTagsHeight"
            :colors="ThemeBorderColors"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签圆角[vTagsItemBorderRadius]"
            :defaultVal="Theme.vTagsItemBorderRadius"
            v-model="themeConfigRef.vTagsItemBorderRadius"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="标签项文字颜色[vTagsTextColor]"
            :defaultVal="Theme.vTagsTextColor"
            v-model="themeConfigRef.vTagsTextColor"
            :colors="ThemeTextColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签项文字悬停颜色[vTagsTextHoverColor]"
            :defaultVal="Theme.vTagsTextHoverColor"
            v-model="themeConfigRef.vTagsTextHoverColor"
            :colors="ThemeTextColors"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签项active文字颜色[vTagsTextActiveColor]"
            :defaultVal="Theme.vTagsTextActiveColor"
            v-model="themeConfigRef.vTagsTextActiveColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签项字号[vTagsFontSize]"
            :defaultVal="Theme.vTagsFontSize"
            v-model="themeConfigRef.vTagsFontSize"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="标签项背景色[vTagsItemBgColor]"
            :defaultVal="Theme.vTagsItemBgColor"
            v-model="themeConfigRef.vTagsItemBgColor"
            :colors="ThemeBgColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签项悬停背景色[vTagsItemBgHoverColor]"
            :defaultVal="Theme.vTagsItemBgHoverColor"
            v-model="themeConfigRef.vTagsItemBgHoverColor"
            :colors="ThemeBgColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="标签项激活背景色[vTagsItemBgActiveColor]"
            :defaultVal="Theme.vTagsItemBgActiveColor"
            v-model="themeConfigRef.vTagsItemBgActiveColor"
            :colors="ThemeBgColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
      </b-row>
      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="标签项边框色[vTagsItemBorderColor]"
            :defaultVal="Theme.vTagsItemBorderColor"
            v-model="themeConfigRef.vTagsItemBorderColor"
            :colors="ThemeBorderColors"
            type="mixed"
          ></GroupPanel>
        </b-col>

        <b-col span="6">
          <GroupPanel
            label="标签项悬停边框色[vTagsItemBorderHoverColor]"
            :defaultVal="Theme.vTagsItemBorderHoverColor"
            v-model="themeConfigRef.vTagsItemBorderHoverColor"
            :colors="ThemeBorderColors"
            type="mixed"
          ></GroupPanel>
        </b-col>

        <b-col span="6">
          <GroupPanel
            label="标签项active边框色[vTagsItemBorderActiveColor]"
            :defaultVal="Theme.vTagsItemBorderActiveColor"
            v-model="themeConfigRef.vTagsItemBorderActiveColor"
            :colors="ThemeBorderColors"
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
  name: 'GTagsView',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
