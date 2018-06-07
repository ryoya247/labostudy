<template>
  <div class = 'mainpage'>
    <Header />
    <h1>this is mainpage</h1>
    <p>こんにちは、{{ this.getUserName }}さん</p>
    <p>{{ this.getUserName }}さんのemail → {{ this.getUserEmail}}</p>
    <p>ひとこと → {{ this.getUserBio }}</p>
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
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/Header/Header.vue'

export default {
  components: {
    Header
  },
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
  // mounted: function () {
  //   console.log('mounted: getUserId', this.getUserId)
  //   console.log('mounted: getCurrentUser', this.getCurrentUser)
  //   console.log('mounted: getCurrentUser', this.getCurrentUserInfo)
  //   if (this.getCurrentUserInfo) {
  //     this.userInfo.userName = this.getCurrentUserInfo.userName
  //     this.userInfo.userEmail = this.getCurrentUserInfo.userEmail
  //     this.userInfo.userBio = this.getCurrentUserInfo.userBio
  //   }
  //   console.log('this.userInfo', this.userInfo)
  // },
  methods: {
    ...mapActions({
      destroySession: 'destroySession'
    }),
    onSignOut () {
      firebase.auth().signOut()
        .then((user) => this.destroySession())
        .then(() => {
          console.log('destroySession:::::')
          this.$router.replace({ name: 'SignIn' })
        })
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
