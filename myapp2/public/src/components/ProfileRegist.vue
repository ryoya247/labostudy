<template>
  <div class = 'profile'>
    <b-container>
      <b-jumbotron bg-variant='light' text-variant='info'>
        <template slot='header'>
          Profile Register
        </template>
        <template slot='lead'>
          続いてあなたのプロフィールを登録しましょう。<br>ニックネームは必須項目ですのでご注意を！
        </template>
        <hr>
        <div class = "formwrapper">
          <b-container class='registForm'>
              <b-form-group label="Profile Picture">
                <div>
                  <img :src="img_def" alt="これは画像だよ！！！">
                  <b-button v-b-modal.SelPicModal>Select Picture</b-button>
                  <b-modal id="SelPicModal" title="Select Picture">
                    <croppa v-model="myCroppa"></croppa>
                  </b-modal>
                </div>
              </b-form-group>
              <b-form-group label='Your Name'>
                <b-form-input v-model='userInfo.userName' type='text' placeholder='name' required></b-form-input>
              </b-form-group>
              <b-form-group label="comment">
                <b-form-textarea v-model='userInfo.userBio' placeholder='comment' :rows='5' :max-rows='8'></b-form-textarea>
              </b-form-group>
              <hr>
              <b-row class='buttons'>
                <b-col>
                  <b-button @click="onRegister" variant="info">保存</b-button>
                </b-col>
              </b-row>
            <!-- </b-form> -->
          </b-container>
        </div>
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileRegist',
  data () {
    return {
      img_def: require("../assets/IMG_1680"),
      userInfo: {
        userName: '',
        userBio: '',
        userEmail: '',
        userIcon: ''
      },
      myCroppa: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ])
  },
  mounted: function () {
    console.log(this.$route.params)
    if (this.$route.params) {
      this.setDefaultUserInfo(this.$route.params.userEmail)
    }
  },
  updated: function () {
    console.log(this.$route.params)
    if (this.getCurrentUserInfo) {
      this.userInfo.userEmail = this.getCurrentUserInfo.userEmail
    }
  },
  methods: {
    ...mapActions('profiles/', {
      setDefaultUserInfo: 'SET_DEFAULT_USER_INFO',
      setProfile: 'SET_PROFILE'
    }),
    onRegister () {
      console.log('click onRegister true')
      this.setProfile(this.userInfo)
      this.$router.push({ name: 'MainPage' })
    }
  }
}
</script>
<style scoped>
.profile{
  max-width: 800px;
  margin: 15px auto;
}
.buttons{
  text-align: right;
}
.formwrapper{
  margin: 30px auto;
  background: #D3F0F4;
  border-radius: 10px;
}
.registForm{
  width: 60%;
  padding: 30px 0;
  margin: 0 auto;
}
</style>
