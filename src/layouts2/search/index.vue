<template>
  <header-trigger icon="search" tooltip="搜索/ctrl+f" @click="toggleSearch" />
  <search-panel />
</template>

<script>
import HeaderTrigger from '@/layouts/header-trigger/index.vue'
import SearchPanel from '@/layouts/search/search-panel.vue'
import useApp from '@/hooks/store/useApp'

export default {
  name: 'Search',
  components: { SearchPanel, HeaderTrigger },
  setup() {
    const { toggleSearch } = useApp()

    return {
      toggleSearch,
    }
  },
}
</script>
