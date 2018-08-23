<template>
  <div>
    {{ this.userId }}
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      userId: ''
    }
  },
  mounted: function () {
    if (this.$route.params) {
      this.userId = this.$route.params.userId
    }
  }
}
</script>
<style lang="">
</style>
