<template>
  <div class="home">
    <b-button type="primary">Home</b-button>
    <p v-for="i in 100" :key="i">内容填充....</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    console.log('home created')
  }
}
</script>
