<template>
  <section class="app-layout layout">
    <section class="app-layout-navbar">
      <NavHeader />
    </section>
    <section class="app-layout layout-main">
      <div
        class="app-layout-sider"
        :class="{ 'sider-collapsed': !setting.sidebar }"
        :style="{ width: siderWidth }"
      >
        <SiderMenu />
      </div>
      <div class="app-layout app-layout-content" :style="{ paddingLeft: siderWidth }">
        <TagsView v-if="setting.tagsView" />
        <div class="app-layout-content-inner">
          <router-view v-slot="{ Component, route }">
            <Transition :name="setting.routerTransitionName" mode="out-in">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="route.path"></component>
              </keep-alive>
            </Transition>
          </router-view>
        </div>
        <footer class="app-layout-footer">bin admin pro</footer>
      </div>
    </section>
  </section>

  <b-back-top :visible-height="200" :right="30" :bottom="60">
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
