<template>
  <div class = 'mainpage'>
    <h1>this is mainpage</h1>
    <p>こんにちは、{{ this.getCurrentUserInfo.userName }}さん</p>
    <p>{{ this.getCurrentUserInfo.userName }}さんのemail → {{ this.getCurrentUserInfo.userEmail}}</p>
    <p>ひとこと → {{ this.getCurrentUserInfo.userBio }}</p>
    <b-button @click='onSignOut'>signOut</b-button>
    <span class="info-profimg">
      <b-img rounded="circle" :src="'static/img/IMG_1680.PNG'" width="75" height="75" class="m-1" />
    </span>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ])
  },
  mounted () {
    console.log('mounted', this.getCurrentUserInfo)
  },
  updated () {
    console.log('updated', this.getCurrentUserInfo)
  },
  methods: {
    onSignOut () {
      firebase.auth().signOut().then(
        (user) => {
          console.log('*** sign out ***')
          this.$router.replace({ name: 'SignIn' })
        }
      )
    }
  }
}

</script>
<style scoped>
</style>
