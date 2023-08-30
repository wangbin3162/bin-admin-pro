<template>
  <b-collapse-wrap title="侧边栏配置" shadow="none" collapse :model-value="false">
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
            label="菜单项高度[vMenuItemHeight]"
            :defaultVal="Theme.vMenuItemHeight"
            v-model="themeConfigRef.vMenuItemHeight"
            type="input"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项圆角[vMenuItemBorderRadius]"
            :defaultVal="Theme.vMenuItemBorderRadius"
            v-model="themeConfigRef.vMenuItemBorderRadius"
            type="input"
          ></GroupPanel>
        </b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="文字颜色[vMenuTextColor]"
            :defaultVal="Theme.vMenuTextColor"
            v-model="themeConfigRef.vMenuTextColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字悬停颜色[vMenuTextHoverColor]"
            :defaultVal="Theme.vMenuTextHoverColor"
            v-model="themeConfigRef.vMenuTextHoverColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="文字active颜色[vMenuTextActiveColor]"
            :defaultVal="Theme.vMenuTextActiveColor"
            v-model="themeConfigRef.vMenuTextActiveColor"
            :colors="ThemeTextColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6"></b-col>
      </b-row>

      <b-row :gutter="16">
        <b-col span="6">
          <GroupPanel
            label="菜单项背景颜色[vMenuBgColor]"
            :defaultVal="Theme.vMenuBgColor"
            v-model="themeConfigRef.vMenuBgColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项悬停背景颜色[vMenuBgHoverColor]"
            :defaultVal="Theme.vMenuBgHoverColor"
            v-model="themeConfigRef.vMenuBgHoverColor"
            :colors="ThemeMenuColors"
            type="mixed"
          ></GroupPanel>
        </b-col>
        <b-col span="6">
          <GroupPanel
            label="菜单项active背景颜色[vMenuBgActiveColor]"
            :defaultVal="Theme.vMenuBgActiveColor"
            v-model="themeConfigRef.vMenuBgActiveColor"
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
