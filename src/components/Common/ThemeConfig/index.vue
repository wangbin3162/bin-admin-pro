<template>
  <div>
    <g-basic></g-basic>
    <g-header></g-header>
    <g-sider></g-sider>
    <g-tags-view></g-tags-view>
    <g-popper></g-popper>
    <g-table></g-table>
    <g-page></g-page>
  </div>
</template>

<script setup>
import GBasic from './group/GBasic.vue'
import GHeader from './group/GHeader.vue'
import GSider from './group/GSider.vue'
import GTagsView from './group/GTagsView.vue'
import GPopper from './group/GPopper.vue'
import GTable from './group/GTable.vue'
import GPage from './group/GPage.vue'

defineOptions({
  name: 'ThemeConfig',
})
</script>

<style></style>
