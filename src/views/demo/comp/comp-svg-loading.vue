<template>
  <page-wrapper desc="svg loading 组件，提供若干自定义配置">
    <b-collapse-wrap title="基础的loading" shadow="none">
      <ul class="loading-wrapper">
        <li v-for="i in 12" :key="i">
          <svg-loading :name="`loading${i<10?('0'+i):i}`" :width="100"></svg-loading>
          <span v-text="`loading${i<10?('0'+i):i}`"></span>
        </li>
        <li>
          <svg-loading name="loading-text"></svg-loading>
        </li>
      </ul>
    </b-collapse-wrap>
    <b-collapse-wrap title="本项目的全局loading" shadow="none">
      <div style="position: relative;height: 400px;">
        <div
          class="loading-mask"
          style="position: absolute;top:0;left:0;right:0;bottom:0;color:#fff;background: linear-gradient(45deg, #222428, #444856);"
          flex="dir:top main:center cross:center"
        >
          <svg-loading name="loading08" :width="150"></svg-loading>
          <div class="mt-16" style="width: 480px;text-align: center;">
            <h1
              class="loading-mask-text"
              style="font-size: 22px;font-weight: bold;text-shadow: 0 0.5rem 1rem rgb(0, 0, 0);"
            >
              BIN-ADMIN-PRO
            </h1>
            <p class="mt-16">loading . . .</p>
          </div>
        </div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'

export default {
  name: 'comp-svg-loading',
  components: { SvgLoading, PageWrapper },
}
</script>

<style scoped lang="stylus">
.loading-wrapper {
  li {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 15%;
    margin-bottom: 16px;
    text-align: center;
  }
}
</style>
