<template>
  <header-trigger icon="search" tooltip="搜索" @click="toggleSearch" />
  <search-panel />
</template>

<script>
import HeaderTrigger from '@/layouts/header-trigger'
import SearchPanel from '@/layouts/search/search-panel'
import useSetting from '@/hooks/useSetting'

export default {
  name: 'Search',
  components: { SearchPanel, HeaderTrigger },
  setup() {
    const { toggleSearch } = useSetting()

    return {
      toggleSearch
    }
  }
}
</script>
