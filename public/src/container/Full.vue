<template>
  <div class="app">
    <app-header></app-header>
    <b-row>
      <b-col sm="2" class="sidebar">
        <app-sidebar></app-sidebar>
      </b-col>
      <b-col sm="10">
        <router-view></router-view>
      </b-col>
    </b-row>
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
.sidebar {
  height: 100vh;
  background-color: skyblue;
}

</style>
