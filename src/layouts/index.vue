<template>
  <div>DefaultLayout
    <router-view :key="$route.name" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>

</style>
