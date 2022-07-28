<template>
  <page-container
    inner-scroll
    desc="基础组件依赖于bin-ui-next，主要用于验证不同组件的主色颜色主题。主题样式默认只覆盖default和primary主色"
  >
    <theme-color-panel />
    <b-collapse-wrap title="default" shadow="none" class="mb-20">
      <div class="p10">
        <b-button>默 认</b-button>
        <b-button disabled>禁 用</b-button>
        <b-button background>拟物按钮</b-button>
        <b-button background disabled>拟物禁用</b-button>
        <b-button loading>loading</b-button>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="primary" shadow="none" class="mb-20">
      <div class="p10">
        <b-button type="primary">主按钮</b-button>
        <b-button type="primary" loading>loading</b-button>
        <b-button type="primary" plain>plain</b-button>
        <b-button type="primary" round>round</b-button>
        <b-button type="primary" transparent>transparent</b-button>
        <b-button type="primary" dashed>dashed</b-button>
        <b-button type="text">text</b-button>
      </div>
      <div class="p10">
        <b-button type="primary" disabled>主按钮</b-button>
        <b-button type="primary" loading disabled>loading</b-button>
        <b-button type="primary" plain disabled>plain</b-button>
        <b-button type="primary" round disabled>round</b-button>
        <b-button type="primary" transparent disabled>transparent</b-button>
        <b-button type="primary" dashed disabled>dashed</b-button>
        <b-button type="text" disabled>text</b-button>
      </div>
    </b-collapse-wrap>
    <b-collapse-wrap title="其他状态" shadow="none" class="mb-20">
      <b-divider align="left">success</b-divider>
      <div class="pl-10">
        <b-button type="success">成 功</b-button>
        <b-button type="success" disabled>禁 用</b-button>
        <b-button type="success" loading>loading</b-button>
        <b-button type="success" plain>plain</b-button>
        <b-button type="success" round>round</b-button>
        <b-button type="success" transparent>transparent</b-button>
        <b-button type="success" dashed>dashed</b-button>
        <b-button type="text" text-color="success">text</b-button>
        <b-button type="text" disabled text-color="success">[disabled success text]</b-button>
        <b-button type="text" disabled>[disabled text]</b-button>
      </div>
      <b-divider align="left">warning</b-divider>
      <div class="pl-10">
        <b-button type="warning">警 告</b-button>
        <b-button type="warning" disabled>禁 用</b-button>
        <b-button type="warning" loading>loading</b-button>
        <b-button type="warning" plain>plain</b-button>
        <b-button type="warning" round>round</b-button>
        <b-button type="warning" transparent>transparent</b-button>
        <b-button type="warning" dashed>dashed</b-button>
        <b-button type="text" text-color="warning">text</b-button>
        <b-button type="text" disabled text-color="warning">[disabled warning text]</b-button>
        <b-button type="text" disabled>[disabled text]</b-button>
      </div>
      <b-divider align="left">danger</b-divider>
      <div class="pl-10">
        <b-button type="danger">错 误</b-button>
        <b-button type="danger" disabled>禁 用</b-button>
        <b-button type="danger" loading>loading</b-button>
        <b-button type="danger" plain>plain</b-button>
        <b-button type="danger" round>round</b-button>
        <b-button type="danger" transparent>transparent</b-button>
        <b-button type="danger" dashed>dashed</b-button>
        <b-button type="text" text-color="danger">text</b-button>
        <b-button type="text" disabled text-color="danger">[disabled danger text]</b-button>
        <b-button type="text" disabled>[disabled text]</b-button>
      </div>
      <b-divider align="left">info</b-divider>
      <div class="pl-10 pb-15">
        <b-button type="info">信 息</b-button>
        <b-button type="info" disabled>禁 用</b-button>
        <b-button type="info" loading>loading</b-button>
        <b-button type="info" plain>plain</b-button>
        <b-button type="info" round>round</b-button>
        <b-button type="info" transparent>transparent</b-button>
        <b-button type="info" dashed>dashed</b-button>
        <b-button type="text" text-color="info">text</b-button>
        <b-button type="text" disabled text-color="info">[disabled info text]</b-button>
        <b-button type="text" disabled>[disabled text]</b-button>
      </div>
    </b-collapse-wrap>
    <template #footer>aaa</template>
  </page-container>
</template>

<script>
import ThemeColorPanel from '@/views/demo/comp/components/theme-color-panel.vue'

export default {
  name: 'Basic',
  components: { ThemeColorPanel },
}
</script>
