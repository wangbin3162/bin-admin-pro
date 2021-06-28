<template>
  <b-collapse-wrap title="主题设置" shadow="none" class="mb-20">
    <div class="p10">
      <theme-panel mode="horizontal" only-theme />
    </div>
  </b-collapse-wrap>
</template>

<script>
import ThemePanel from '@/layouts/setting/theme-panel'

export default {
  name: 'theme-color-panel',
  components: { ThemePanel }
}
</script>
