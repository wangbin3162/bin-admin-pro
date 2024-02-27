<template>
  <page-wrapper
    desc="多种动效使用方案，实际使用的时候根据实际需求进行不同方案的选择。以达到最好的动效方案。"
  >
    <div class="panel">
      <b-tabs v-model="activeTab" :data="tabs" type="card"></b-tabs>
      <div class="content-box">
        <keyframe v-if="activeTab === 'tab1'" />
        <apng v-if="activeTab === 'tab2'" />
        <lottie v-if="activeTab === 'tab3'" />
        <pag v-if="activeTab === 'tab4'" :url="getImageUrl('pag_test.pag')" />
      </div>
    </div>
  </page-wrapper>
</template>

<script setup>
import { ref } from 'vue'
import keyframe from './components/keyframe.vue'
import apng from './components/apng.vue'
import lottie from './components/lottie.vue'
import pag from './components/pag.vue'
import { getImageUrl } from './util'

const activeTab = ref('tab1')
const tabs = ref([
  // { key: 'tab0', title: '测试0' },
  { key: 'tab1', title: '关键帧' },
  { key: 'tab2', title: 'APNG' },
  { key: 'tab3', title: 'Lottie' },
  { key: 'tab4', title: 'Pag' },
])
</script>

<style scoped>
.panel {
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
