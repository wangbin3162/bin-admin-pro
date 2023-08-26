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
        <TagsView v-if="setting.tagsView" />
        <div class="layout-content-inner">
          <router-view v-slot="{ Component, route }">
            <Transition :name="setting.routerTransitionName" mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.path"></component>
              </keep-alive>
            </Transition>
          </router-view>
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
import TagsView from './src/tags-view/TagsView.vue'

import { useStore } from '@/store'

const { storeToRefs, tagsStore, settingStore } = useStore()
const { setting, siderWidth } = storeToRefs(settingStore)
const { cachedViews } = storeToRefs(tagsStore)
</script>
