<template>
  <b-container>
    <div class="seminer-detail-header">
      <h2>勉強会詳細</h2>
      <b-button class="register-button" variant="primary">登録</b-button>
      <b-button class="back-button" variant="danger">キャンセル</b-button>
    </div>
    <b-row>
      <b-col cols="7">
        <b-card>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default{
  name: 'SeminerDetail',
  components: {
    VueMarkdown
  },
  data () {
    return {
      paraOid: '',
      paraSid: '',
      gotSeminer: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getSeminersById'
    ]),
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) {
        return this.getCurrentUserInfo.userIcon
      }
    }
  },
  mounted: function () {
    console.log(this.$route.params)
    if (this.$route.params) {
      this.paraOid = this.$route.params.oid
      this.paraSid = this.$route.params.sid
      this.gotSeminer = this.getSeminersById(this.paraSid)
      console.log(this.gotSeminer)
    } else {
      this.$router.replace('MainPage')
    }
  }
}
</script>

<style scoped>
.seminer-detail-header{
  margin-bottom: 20px;
  margin-top: 10px;
  display: flex;
}
.seminer-detail-header h2{
  font-weight: bold;
}
.register-button, .back-button{
  width: 150px;
  margin-right: 5px;
}
.register-button{
  margin-left: auto;
}
</style>
