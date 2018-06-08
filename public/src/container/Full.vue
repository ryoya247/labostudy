<template>
  <div class="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import AppHeader from '../components/Header/AppHeader.vue'
console.log(AppHeader)

export default {
  name: 'full',
  components: {
    AppHeader
  }
}
</script>
<style>
</style>
