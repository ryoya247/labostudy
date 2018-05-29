<template>
  <div class = 'mainpage'>
    <h1>this is mainpage</h1>
    <p>こんにちは、{{ this.userInfo.userName }}さん</p>
    <p>{{ this.userInfo.userName }}さんのemail → {{ this.userInfo.userEmail}}</p>
    <p>ひとこと → {{ this.userInfo.userBio }}</p>
    <b-button @click='onSignOut'>signOut</b-button>
    <span class="info-profimg">
      <b-img rounded="circle" :src="'static/img/IMG_1680.PNG'" width="75" height="75" class="m-1" />
    </span>
    <div>
      <b-button v-b-modal.SelPicModal>Select Picture</b-button>
      <b-modal id="SelPicModal" title="Select Picture">
        <croppa v-model="myCroppa"
                :width="300"
                :height="300"
                :prevent-white-space="true"
                :image-border-radius="310"
                :show-loading="true">
        </croppa>
      </b-modal>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
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
      'getCurrentUserInfo'
    ])
  },
  created () {
    console.log('created', this.getCurrentUserInfo)
  },
  mounted () {
    console.log('mounted', this.getCurrentUserInfo)
    if (this.getCurrentUserInfo) {
      this.userInfo.userName = this.getCurrentUserInfo.userName
      this.userInfo.userEmail = this.getCurrentUserInfo.userEmail
      this.userInfo.userBio = this.getCurrentUserInfo.userBio
    }
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
.mainpage{
  max-width: 800px;
  margin: 15px auto;
}
</style>
