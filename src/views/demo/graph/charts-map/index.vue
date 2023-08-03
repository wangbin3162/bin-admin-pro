<template>
  <div class="panel">
    <b-tabs v-model="activeTab" :data="tabs" type="card"></b-tabs>
    <div class="content-box">
      <Demo1 v-if="activeTab === 'tab1'" />
      <Demo2 v-if="activeTab === 'tab2'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Demo1 from './demo1/demo1.vue'
import Demo2 from './demo2/demo2.vue'

const activeTab = ref('tab1')
const tabs = ref([
  { key: 'tab1', title: '关系图示例1' },
  { key: 'tab2', title: '示例2' },
])
</script>

<style lang="stylus" scoped>
.panel {
  padding: 16px;
  .content-box {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #e4e7ed;
    border-top: none;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
