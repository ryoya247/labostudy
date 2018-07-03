<template>
  <div class = 'mainpage'>
    <b-container>
      <div class="list-title">
        <h1>Seminer List</h1>
        <p>ハロー、{{ this.getUserName }}さん！</p>
      </div>
      <b-button class="participate-seminer">参加予定</b-button>
      <b-button class="make-seminer" @click="makeSeminer">勉強会を作成</b-button>
      <b-row class="clear">
        <b-col cols="8">
          <div v-for="(seminer, index) in getSeminers" :key="index">
            <seminer v-if="index != '.key'" :title="seminer.title" :ownerId="seminer.ownerId" :seminerDate="seminer.seminerDate" :itemId="index" :detailMember="seminer.detailMember" :description="seminer.description"></seminer>
          </div>
        </b-col>
        <b-col cols="4">
          <b-card>
            <p>test</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import firebase from 'firebase'
import { mapGetters } from 'vuex'
import seminer from '@/components/seminer.vue'

export default {
  data () {
    return {
      myCroppa: {},
      userInfo: {
        userName: '',
        userEmail: '',
        userBio: '',
        userIcon: ''
      }
    }
  },
  components: {
    seminer
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUser',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getSeminers'
    ]),
    getUserName () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userName) return this.getCurrentUserInfo.userName
      else return ''
    },
    getUserEmail () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userEmail) return this.getCurrentUserInfo.userEmail
      else return ''
    },
    getUserBio () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userBio) return this.getCurrentUserInfo.userBio
      else return ''
    },
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) return this.getCurrentUserInfo.userIcon
      else return ''
    }
  },
  created () {
    console.log('::MainPage created::')
  },
  mounted () {
    console.log('getSeminers', Object.keys(this.getSeminers))
  },
  methods: {
    makeSeminer () {
      console.log(this.getUserId)
      // this.$router.push({ name: 'SeminerRegist', params: { item: this.userInfo } })
      this.$router.push({ name: 'SeminerRegist' })
    }
  }
}

</script>
<style scoped>
.make-seminer, .participate-seminer{
  float: right;
  margin-top: 20px;
  margin-left: 10px;
}
.list-title{
  float: left;
}
.clear{
  clear: both;
}
</style>
