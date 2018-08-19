<template>
  <div class="app">
    <app-header></app-header>
    <div class="page_wrapper">
      <div class="sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import AppHeader from '../components/Header/AppHeader.vue'
import AppSidebar from '../components/Sidebar/AppSidebar.vue'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>
<style>

</style>
