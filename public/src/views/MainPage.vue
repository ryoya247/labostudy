<template>
  <div class = 'mainpage'>
    <b-container>
      <div class="list-title">
        <h1>Seminer List</h1>
        <b-button class="make-seminer" @click="makeSeminer">勉強会を作成</b-button>
        <b-button class="participate-seminer" @click="toMySeminerList">参加予定</b-button>
      </div>
      <p>ハロー、{{ this.getUserName }}さん！</p>
      <b-row>
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
    },
    toMySeminerList () {
      this.$router.push({ name: 'SeminerMyList' })
    }
  }
}

</script>
<style scoped>
.make-seminer, .participate-seminer{
  margin-top: 20px;
  margin-right: 5px;
}
.make-seminer{
  margin-left: auto;
}
.list-title{
  margin-bottom: 20px;
  display: flex;
}

</style>
