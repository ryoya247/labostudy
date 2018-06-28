<template>
  <div class="contents">
    <vue-markdown>{{ content.description }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default{
  name: 'seminer',
  props: {
    content: {

    }
  },
  components: {
    VueMarkdown
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.contents{
  border: dashed 1px gray;
}
</style>
