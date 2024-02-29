<template>
  <div class="panel">
    <b-tabs v-model="activeTab" :data="tabs" type="card"></b-tabs>
    <div class="content-box">
      <Demo01 v-if="activeTab === 'demo01'" />
      <Demo02 v-if="activeTab === 'demo02'" />
      <Demo03 v-if="activeTab === 'demo03'" />
      <Demo04 v-if="activeTab === 'demo04'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import Demo01 from './demo01/index.vue'
import Demo02 from './demo02/index.vue'
import Demo03 from './demo03/index.vue'
import Demo04 from './demo04/index.vue'

const activeTab = ref('demo01')
const tabs = ref([
  { key: 'demo01', title: '基础' },
  { key: 'demo02', title: '节点' },
  { key: 'demo03', title: '综合' },
  { key: 'demo04', title: '拖放' },
])
</script>

<style scoped>
.panel {
  padding: 16px 16px 0;
  .content-box {
    background-color: #fff;
    padding: 16px;
    border: 1px solid #e4e7ed;
    border-top: none;
    > div {
      width: 100%;
      height: calc(100vh - 224px);
    }
  }
}
</style>
