<template>
  <div class = 'mainpage'>
    <h1>this is mainpage</h1>
    <p>こんにちは、{{ this.getUserName }}さん</p>
    <p>{{ this.getUserName }}さんのemail → {{ this.getUserEmail}}</p>
    <p>ひとこと → {{ this.getUserBio }}</p>
      <b-button @click="makeSeminer">勉強会を作成</b-button>
  </div>
</template>
<script>
// import firebase from 'firebase'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUser',
      'getCurrentUserInfo'
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
  // mounted () {
  //   console.log(this.getUserName)
  //   this.userInfo.userName = this.getUserName
  //   this.userInfo.userEmail = this.getUserEmail
  //   this.userInfo.userBio = this.getUserBio
  //   this.userInfo.userIcon = this.getUserIcon
  //   console.log(this.userInfo)
  // },
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

</style>
