<template>
  <page-wrapper desc="基础组件依赖于bin-ui-next,组件库已有的基础组件" content-bg>
    <div class="demo-button">
      <b-button>Default</b-button>
      <b-button type="dashed">Dashed</b-button>
      <b-button type="primary">Primary</b-button>
      <b-button type="success">Success</b-button>
      <b-button type="info">Info</b-button>
      <b-button type="warning">Warning</b-button>
      <b-button type="danger">Danger</b-button>
    </div>
    <div class="demo-button">
      <b-button type="primary" plain>Primary</b-button>
      <b-button type="success" plain>Success</b-button>
      <b-button type="info" plain>Info</b-button>
      <b-button type="warning" plain>Warning</b-button>
      <b-button type="danger" plain>Danger</b-button>
    </div>
    <div class="demo-button">
      <b-button type="primary" round>Primary</b-button>
      <b-button type="success" round>Success</b-button>
      <b-button type="info" round>Info</b-button>
      <b-button type="warning" round>Warning</b-button>
      <b-button type="danger" round>Danger</b-button>
    </div>
    <div class="demo-button">
      <b-button dashed>Default</b-button>
      <b-button type="primary" dashed>Primary</b-button>
      <b-button type="success" dashed>Success</b-button>
      <b-button type="info" dashed>Info</b-button>
      <b-button type="warning" dashed>Warning</b-button>
      <b-button type="danger" dashed>Danger</b-button>
    </div>
    <div class="demo-button" style="background: #cad4d4;padding: 10px;">
      <b-button type="primary" transparent size="small">Primary</b-button>
      <b-button type="success" transparent size="small">Success</b-button>
      <b-button type="info" transparent size="small">Info</b-button>
      <b-button type="warning" transparent size="small">Warning</b-button>
      <b-button type="danger" transparent size="small">Danger</b-button>
    </div>
    <b-divider></b-divider>
    <div class="demo-button">
      <b-button disabled>Default</b-button>
      <b-button type="dashed" disabled>Dashed</b-button>
      <b-button type="primary" disabled>Primary</b-button>
      <b-button type="success" disabled>Success</b-button>
      <b-button type="info" disabled>Info</b-button>
      <b-button type="warning" disabled>Warning</b-button>
      <b-button type="danger" disabled>Danger</b-button>
    </div>
    <b-divider></b-divider>
    <div>
      <b-button type="text">文字按钮</b-button>
      <b-button type="text" text-color="primary">Primary</b-button>
      <b-button type="text" text-color="success">Success</b-button>
      <b-button type="text" text-color="info">Info</b-button>
      <b-button type="text" text-color="warning">Warning</b-button>
      <b-button type="text" text-color="danger">Danger</b-button>
      <b-button type="text" text-color="#b37feb">多彩按钮</b-button>
      <b-button type="text" text-color="#f759ab">多彩按钮2</b-button>
    </div>
  </page-wrapper>
</template>

<script>

import PageWrapper from '@/components/Page/PageWrapper'
export default {
  name: 'Basic',
  components: { PageWrapper }
}
</script>

<style scoped>
.demo-button {
  margin-bottom: 8px;
}
</style>
