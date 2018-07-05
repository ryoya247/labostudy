<template>
  <div class="seminer-my-list">
    <b-container>
      <div class="list-title">
        <h1>My Seminer List</h1>
        <b-button @click="onClickBack" class="back-button">戻る</b-button>
      </div>
      <b-card>
        <div v-for="(mysem, seminerKey) in getParticipateSeminers" :key="seminerKey">
          <div v-for="(mySeminer, index) in getSeminersById(seminerKey)" :key="index">
            <p>{{ mySeminer.title }}</p>
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default{
  name: 'SeminerMyList',
  computed: {
    ...mapGetters([
      'getUserId'
    ]),
    ...mapGetters('seminers/', [
      'getParticipateSeminers',
      'getSeminersById'
    ])
  },
  methods: {
    onClickBack () {
      this.$router.push({ name: 'MainPage' })
    }
  },
  mounted: function () {
    console.log(Object.keys(this.getParticipateSeminers))
  }
}
</script>

<style scoped>
.list-title{
  display: flex;
  margin-bottom: 20px;
}
.back-button{
  margin-top: 20px;
  margin-left: auto;
}
</style>
