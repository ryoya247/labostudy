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
                  <b-button v-b-modal.SelPicModal>Select Picture</b-button>
                  <b-img v-if="userInfo.userIcon" width="80px" height="80px" :src="userInfo.userIcon" alt=""/>
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
    <b-modal id="SelPicModal" title="Select Picture" ref="modal" @hide="handleClickEvent">
      <croppa v-model="myCroppa"
              :width="300"
              :height="300"
              :prevent-white-space="true"
              :show-remove-button="true"
              remove-button-color="black"
              :accept="'image/*'"
              @file-type-mismatch="onFileTypeMismatch"
              :show-loading="true">
      </croppa>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { storage } from '@/main'
import moment from 'moment'

export default {
  name: 'ProfileRegist',
  data () {
    return {
      userInfo: {
        userName: '',
        userBio: '',
        userEmail: this.currentEmail,
        userIcon: ''
      },
      myCroppa: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    getCurrentUserEmail () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userEmail) {
        return this.getCurrentUserInfo.userEmail
      } else {
        return ''
      }
    }
  },
  created: function () {
    console.log('created', this.$firebase.auth().currentUser.email)
    if (this.$firebase.auth().currentUser.email) {
      this.setDefaultUserInfo(this.$firebase.auth().currentUser.email)
      this.userInfo.userEmail = this.$firebase.auth().currentUser.email
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
      this.$router.push({ name: 'SeminerList' })
    },
    handleClickEvent: function (evt) {
      // console.log(evt)
      if ((evt.trigger === 'backdrop' || evt.trigger === 'cancel' || evt.trigger === 'header-close') && this.myCroppa.imageSet) {
        evt.preventDefault()
        if (confirm('てっててててて')) {
          this.removeCroppa()
        }
      } else if ((evt.trigger === 'backdrop' || evt.trigger === 'cancel' || evt.trigger === 'header-close') && !this.myCroppa.imageSet) {
        this.$refs.modal.hide()
      } else if (evt.trigger === 'ok' && !this.myCroppa.imageSet) {
        evt.preventDefault()
        alert('アラートだよ')
      } else if (evt.trigger === 'ok' && this.myCroppa.imageSet) {
        this.uploadResizedPhoto()
      }
    },
    removeCroppa: function () {
      this.myCroppa.remove()
      this.$refs.modal.hide()
    },
    onFileTypeMismatch (file) {
      this.swal({
        text: 'jpg, gif, png形式でアップして下さい。',
        type: 'warning'
      })
    },
    uploadResizedPhoto () {
    // console.log(this.myCroppa.generateBlob(blob))
      var date = moment()
      let userId = this.getUserId
      var profileImageUrl = (date / 1000) + '.jpg'
      const storageProfilePhotoRef = storage.ref('profilepictures/' + userId)
      const path = profileImageUrl
      const photoImagesRef = storageProfilePhotoRef.child(path)
      this.myCroppa.generateBlob((blob) => {
        photoImagesRef.put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              this.userInfo.userIcon = url
            })
          })
          .catch((err) => {
            console.log('upload error:', err)
          })
      })
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
