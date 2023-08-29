<template>
  <b-collapse-wrap title="侧边栏配置" shadow="none" collapse>
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
            label="侧边栏背景颜色[vSiderBg]"
            :defaultVal="Theme.vSiderBg"
            v-model="themeConfigRef.vSiderBg"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="侧边栏边框颜色[vSiderBorderColor]"
            :defaultVal="Theme.vSiderBorderColor"
            v-model="themeConfigRef.vSiderBorderColor"
            :colors="ThemeBorderColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项高度[bMenuItemHeight]"
            :defaultVal="Theme.bMenuItemHeight"
            v-model="themeConfigRef.bMenuItemHeight"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项圆角[bMenuItemBorderRadius]"
            :defaultVal="Theme.bMenuItemBorderRadius"
            v-model="themeConfigRef.bMenuItemBorderRadius"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="文字颜色[bMenuTextColor]"
            :defaultVal="Theme.bMenuTextColor"
            v-model="themeConfigRef.bMenuTextColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字悬停颜色[bMenuTextHoverColor]"
            :defaultVal="Theme.bMenuTextHoverColor"
            v-model="themeConfigRef.bMenuTextHoverColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字active颜色[bMenuTextActiveColor]"
            :defaultVal="Theme.bMenuTextActiveColor"
            v-model="themeConfigRef.bMenuTextActiveColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6"></b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="菜单项背景颜色[bMenuBgColor]"
            :defaultVal="Theme.bMenuBgColor"
            v-model="themeConfigRef.bMenuBgColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项悬停背景颜色[bMenuBgHoverColor]"
            :defaultVal="Theme.bMenuBgHoverColor"
            v-model="themeConfigRef.bMenuBgHoverColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项active背景颜色[bMenuBgActiveColor]"
            :defaultVal="Theme.bMenuBgActiveColor"
            v-model="themeConfigRef.bMenuBgActiveColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6"></b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="收起文字色[vSiderCollapseBtnColor]"
            :defaultVal="Theme.vSiderCollapseBtnColor"
            v-model="themeConfigRef.vSiderCollapseBtnColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="收起背景色[vSiderCollapseBtnBg]"
            :defaultVal="Theme.vSiderCollapseBtnBg"
            v-model="themeConfigRef.vSiderCollapseBtnBg"
            :colors="ThemeFillColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="收起悬停背景色[vSiderCollapseBtnBgHover]"
            :defaultVal="Theme.vSiderCollapseBtnBgHover"
            v-model="themeConfigRef.vSiderCollapseBtnBgHover"
            :colors="ThemeFillColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6"></b-col>
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
  ThemeFillColors,
} from '@/hooks/theme'
defineOptions({
  name: 'GSider',
})
</script>

<style scoped>
.theme-config-panel {
  padding: 20px 20px 0;
}
</style>
