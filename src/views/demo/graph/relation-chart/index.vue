<template>
  <page-wrapper>
    <div class="panel">
      <div class="controll">
        <b-button>测试</b-button>
      </div>
      <div class="content-box">
        <div id="3d-graph"></div>
      </div>
    </div>
  </page-wrapper>
</template>

<script setup>
// import { useDemo } from './demo01/useDemo'
import { useDemo } from './demo02/useDemo'

useDemo()
</script>

<style scoped>
.panel {
  position: relative;
  width: 100%;
  .content-box {
    width: 100%;
    background-color: #fff;
    min-height: 400px;
    height: calc(100vh - 226px);
    border: 1px solid #e4e7ed;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .controll {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 90;
    padding: 10px;
  }
}
</style>
