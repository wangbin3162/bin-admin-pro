<template>
  <section class="bin-layout layout">
    <section class="layout-navbar">
      <NavHeader />
    </section>
    <section class="bin-layout layout-main">
      <div
        class="layout-sider"
        :class="{ 'sider-collapsed': !setting.sidebar }"
        :style="{ width: siderWidth }"
      >
        <SiderMenu />
      </div>
      <div class="bin-layout layout-content" :style="{ paddingLeft: siderWidth }">
        <div class="layout-content-inner">
          <div style="background: #fff">aaa</div>
          <!-- <div v-for="i in 100" :key="i">占位 行{{ i }}</div> -->
        </div>
        <footer class="layout-footer">bin admin pro</footer>
      </div>
    </section>
  </section>

  <b-back-top :visible-height="200" :right="30" :bottom="40">
    <i class="b-iconfont b-icon-vertical-align-top back-top"></i>
  </b-back-top>
</template>

<script setup>
import './index.css'
import NavHeader from './src/nav-header/NavHeader.vue'
import SiderMenu from './src/sider-menu/SiderMenu.vue'

import { useStore } from '@/store'

const { storeToRefs, settingStore } = useStore()
const { setting, siderWidth } = storeToRefs(settingStore)
</script>
