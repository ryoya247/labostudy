<template>
  <div class="app">
    <app-header></app-header>
    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import AppHeader from '../components/Header/AppHeader.vue'

export default {
  name: 'full',
  components: {
    AppHeader
  }
}
</script>
<style>
/* .routerView{
  margin: 5
} */
</style>
