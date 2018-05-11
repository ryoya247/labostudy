<template>
  <div class = 'mainpage'>
    <h1>this is mainpage</h1>
    <p>こんにちは、{{ this.getCurrentUserInfo.userName }}さん</p>
    <p>{{ this.getCurrentUserInfo.userName }}さんのemail → {{ this.getCurrentUserInfo.userEmail}}</p>
    <p>ひとこと → {{ this.getCurrentUserInfo.userBio }}</p>
    <b-button @click='onSignOut'>signOut</b-button>
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
    console.log(this.getCurrentUserInfo)
  },
  methods: {
    onSignOut () {
      firebase.auth().signOut().then(
        (user) => {
          console.log('*** sign out ***')
          console.log(user)
          this.$router.replace({ name: 'SignIn' })
        }
      )
    }
  }
}

</script>
<style scoped>
</style>
