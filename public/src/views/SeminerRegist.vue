<template>
  <div>
    <b-container>
        <h2 class="page_title">勉強会作成</h2>
        <b-button @click="onSeminerRegist" class="register-button" variant="primary">登録</b-button>
        <b-button @click="cancelRegist" class="back-button" variant="danger">キャンセル</b-button>
      <b-row>
        <b-col cols="7">
          <!-- イベント名 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">タイトル</p>
            <b-form-input size="lg" type="text" placeholder="勉強会のタイトルを入力" v-model="seminerInfo.title"></b-form-input>
          </b-card>

          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">サブタイトル</p>
            <b-form-input type="text" placeholder="サブタイトル" v-model="seminerInfo.subtitle"></b-form-input>
          </b-card>

          <!-- イベント画像 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">サムネイル</p>
              <b-button v-b-modal.SelPicModal>画像を選択</b-button>
              <div class="img-wrapper">
                <b-img class="cropped-img" v-if="this.seminerInfo.seminerImage" fluid :src="this.seminerInfo.seminerImage" alt=""/>
              </div>
              <b-modal size="lg" id="SelPicModal" title="Select Picture" ref="modal" @hide="handleClickEvent">
                <croppa v-model="myCroppa"
                        :width="700"
                        :height="300"
                        :prevent-white-space="true"
                        remove-button-color="black"
                        :accept="'image/*'"
                        @file-type-mismatch="onFileTypeMismatch"
                        :show-loading="true">
                </croppa>
              </b-modal>
          </b-card>

          <!-- イベント詳細 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">詳細</p>
            <b-tabs>
              <b-tab title="編集">
                <b-form-textarea v-model="seminerInfo.description"
                                 placeholder="MarkDown"
                                 :rows="10"
                                 :max-rows="10"
                                 :no-resize=true>
                </b-form-textarea>
              </b-tab>
              <b-tab title="プレビュー">
                <vue-markdown :source="seminerInfo.description"></vue-markdown>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>

        <!-- sidebar (right) -->
        <b-col cols="5">
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">開催日時</p>
            <b-row>
              <b-col sm="12">
                <span class="demonstration">開始日時</span>
                  <el-date-picker
                    v-model="seminerInfo.seminerDate.start"
                    type="datetime"
                    placeholder="日時を選択"
                    class="datepicker">
                  </el-date-picker>
                <span class="demonstration">終了日時</span>
                  <el-date-picker
                    v-model="seminerInfo.seminerDate.end"
                    type="datetime"
                    placeholder="日時を選択"
                    class="datepicker">
                  </el-date-picker>
              </b-col>
            </b-row>
          </b-card>

          <!-- イベント主催者 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">主催者</p>
               <b-media>
                 <b-img v-if="this.getCurrentUserIcon" slot="aside" :src="this.getCurrentUserIcon" width="70" height="70" alt="placeholder" class="eyecatch"/>
                 <b-img v-else slot="aside" width="70" height="70" alt="placeholder" blank blank-color="#ccc" class="eyecatch" />
                 <h5 class="mt-0">{{ this.getCurrentUserName }}</h5>
                 <p>{{ this.getCurrentUserBio }}</p>
               </b-media>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { storage } from '@/main'
import VueMarkdown from 'vue-markdown'
import moment from 'moment'

export default{
  name: 'SeminerRegist',
  components: {
    VueMarkdown
  },
  data () {
    return {
      seminerInfo: {
        title: '',
        subtitle: '',
        attendUsers: '',
        seminerImage: '',
        seminerDate: {
          start: '',
          end: ''
        },
        description: '',
        status: 'beforeHold',
        ownerId: this.getUserId
      },
      userInfo: {
        userName: '',
        userEmail: '',
        userBio: '',
        userIcon: ''
      },
      myCroppa: {}
    }
  },
  updated: function () {
    console.log('seminerInfo', moment(this.seminerInfo.seminerDate.start))
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    getCurrentUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) {
        return this.getCurrentUserInfo.userIcon
      }
    },
    getCurrentUserName () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userName) {
        return this.getCurrentUserInfo.userName
      }
    },
    getCurrentUserBio () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userBio) {
        return this.getCurrentUserInfo.userBio
      }
    },
    getDescription () {
      if (this.seminerInfo.description) {
        return this.seminerInfo.description
      }
    }
  },
  methods: {
    ...mapActions('seminers/', {
      setNewSeminer: 'SET_NEW_SEMINER'
    }),
    dateToTimestamp (start, end) {
      let ts = new Date(start).getTime()
      this.seminerInfo.seminerDate.start = ts
      let te = new Date(end).getTime()
      this.seminerInfo.seminerDate.end = te
    },
    onSeminerRegist () {
      let si = this.seminerInfo
      si.ownerId = this.getUserId
      this.dateToTimestamp(si.seminerDate.start, si.seminerDate.end)
      this.setNewSeminer(si)
      this.$router.push({ name: 'SeminerList' })
      this.$swal({
        type: 'success',
        text: '登録しました！'
      })
    },
    cancelRegist () {
      this.$router.push({ name: 'SeminerList' })
    },
    handleClickEvent: function (evt) {
      // console.log(evt)
      if ((evt.trigger === 'backdrop' || evt.trigger === 'cancel' || evt.trigger === 'header-close') && this.myCroppa.imageSet) {
        evt.preventDefault()
        if (confirm('画像は保存されません、よろしいですか？')) {
          this.removeCroppa()
        }
      } else if ((evt.trigger === 'backdrop' || evt.trigger === 'cancel' || evt.trigger === 'header-close') && !this.myCroppa.imageSet) {
        this.$refs.modal.hide()
      } else if (evt.trigger === 'ok' && !this.myCroppa.imageSet) {
        evt.preventDefault()
        this.$swal({
          title: '画像を選択してください。',
          type: 'warning'
        })
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
      var date = moment()
      let userId = this.getUserId
      var seminerImageUrl = (date / 1000) + '.jpg'
      const storageSeminerImagesRef = storage.ref('seminerImages/' + userId)
      const path = seminerImageUrl
      const seminerImagesRef = storageSeminerImagesRef.child(path)
      // generateBlobで、画像からblobオブジェクトを作成します。
      // blobオブジェクトをそのままputメソッドで、Cloud Storageにアップしています。
      this.myCroppa.generateBlob((blob) => {
        seminerImagesRef.put(blob)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              this.seminerInfo.seminerImage = url
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
.datepicker {
  width: 100%;
}
/* .form-card{
  border: lightgray solid 3px;
  margin-bottom: 10px;
}
.register-button, .back-button{
  width: 150px;
  margin-right: 5px;
}
.register-button{
  margin-left: auto;
}
.eventRegistHeader{
  margin-bottom: 20px;
  margin-top: 10px;
}
.eventRegistHeader h2{
  font-weight: bold;
}
.header-text{
  font-weight: bold;
}
.cropped-img{
  object-fit: cover;
}
.img-wrapper{
  width: 100%;
} */
</style>
