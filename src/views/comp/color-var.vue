<template>
  <page-wrapper title="基础颜色" desc="基础颜色，系统主题会默认注入不同的主色和颜色，这里可以动态设置颜色查看效果">
    <theme-color-panel />
    <b-collapse-wrap title="颜色设置" shadow="none">
      <div class="p10">
        <b-alert>
          颜色值根据主色变换而来，颜色转换借助
          <a href="https://www.npmjs.com/package/color" target="_blank">[color]</a>插件，
          具体使用方法见官网
        </b-alert>
        <b-divider align="left">primary</b-divider>
        <div class="block primary-active-color">primary-active</div>
        <div class="block primary-color">primary</div>
        <div class="block primary-hover-color">primary-hover</div>

        <b-divider align="left">primary-light</b-divider>
        <div class="block primary-lighten3-color">primary-lighten3</div>
        <div class="block primary-lighten5-color">primary-lighten5</div>
        <div class="block primary-lighten-hover-color">primary-lighten-hover</div>

        <b-divider align="left">menu color</b-divider>
        <div class="block menu menu-bg-color">menu-bg</div>
        <div class="block menu menu-bg-active-color">menu-bg-active</div>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Page/PageWrapper'
import ThemeColorPanel from '@/views/comp/components/theme-color-panel'

export default {
  name: 'ColorVar',
  components: { PageWrapper, ThemeColorPanel }
}
</script>

<style lang="stylus" scoped>
.block {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 200px;
  height: 60px;
  border-radius: 4px;
  margin: 0 20px 0 0;
}
[data-theme=light] .block.menu {
  color: #333;
}
.primary-color {
  background: var(--primary-color);
}
.primary-hover-color {
  background: var(--primary-hover-color);
}
.primary-active-color {
  background: var(--primary-active-color);
}
.primary-lighten3-color {
  color: #333;
  background: var(--primary-lighten3-color);
}
.primary-lighten5-color {
  color: #333;
  background: var(--primary-lighten5-color);
}
.primary-lighten-hover-color {
  color: #333;
  background: var(--primary-lighten-hover-color);
}
.menu-bg-color {
  box-shadow: 0 0 3px #d4d4d4;
  background: var(--menu-bg-color);
}
.menu-bg-active-color {
  box-shadow: 0 0 3px #d4d4d4;
  background: var(--menu-bg-active-color);
}
</style>
