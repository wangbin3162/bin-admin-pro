<template>
  <section class="bin-layout layout">
    <section class="layout-navbar">
      <NavHeader />
    </section>
    <section class="bin-layout layout-main">
      <div class="layout-sider">layout-sider</div>
      <div class="bin-layout layout-content">
        <div class="layout-content-inner">
          <div style="background: #fff">aaa</div>
          <div v-for="i in 100" :key="i">占位 行{{ i }}</div>
        </div>
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
</script>
