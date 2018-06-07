<template>
  <div class="hello">
    <p>デプロイテスト</p>
    <div>{{ this.msg }}</div>
    <input type='text' v-model="msg" />
    <div>
      <p>コメントを入力</p>
      <input type='text' v-model="comment.textContent"/>
      <p>名前を入力</p>
      <input type='text' v-model="comment.name"/>
      <button @click='onSetComment'>登録</button>
    </div>
    <router-link :to="{ name: 'Register' }">go to register</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data: function () {
    return {
      msg: '',
      comment: {
        name: '',
        textContent: ''
      }
    }
  },
  methods: {
    ...mapActions({
      setNewComment: 'SET_NEW_COMMENT'
    }),
    onSetComment: function () {
      console.log('clicked!')
      this.setNewComment(this.comment)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
