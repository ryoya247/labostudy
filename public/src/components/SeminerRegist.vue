<template>
  <div>
    <b-container>
    <div class="eventRegistHeader">
      <b-row>
        <b-col cols="12" md="7">
          <h2>勉強会作成</h2>
        </b-col>
        <b-col cols="12" md="5">
          <b-button @click="onSeminerRegist" class="register-button" variant="primary">登録</b-button>
          <b-button @click="cancelRegist" class="back-button" variant="danger">キャンセル</b-button>
        </b-col>
      </b-row>
    </div>

      <b-row>
        <b-col cols="7">
          <!-- イベント名 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">勉強会名</p>
            <b-form-input size="lg" type="text" placeholder="勉強会のタイトルを入力" v-model="seminerInfo.title"></b-form-input>
          </b-card>

          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">サブタイトル（50文字以内）</p>
            <b-form-input type="text" placeholder="サブタイトル" v-model="seminerInfo.title"></b-form-input>
          </b-card>

          <!-- 参加者詳細 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">参加者詳細</p>
            <b-row>
              <b-col cols="6">
                <label for="participation">参加枠名</label>
                <b-form-input v-model="seminerInfo.detailMember.name" id="participation" size="sm" type="text"></b-form-input>
              </b-col>
              <b-col cols="3">
                <label for="capacity">定員数（人）</label>
                <b-form-input v-model="seminerInfo.detailMember.capa" id="capacity" size="sm" type="text"></b-form-input>
              </b-col>
              <!-- <b-col cols="3">
                <label for="avlorlot">先着 / 抽選</label>
                <b-form-select v-model="seminerInfo.detailMember.arrivalOrLottely" id="avlorlot" :options="arrivalOrLottely" size="sm" />
              </b-col> -->
            </b-row>
          </b-card>

          <!-- イベント画像 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">イベント画像</p>
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
          <!-- <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">詳細プレビュー</p>
            <vue-markdown :source="seminerInfo.description"></vue-markdown>
          </b-card> -->
        </b-col>
        <!-- sidebar (right) -->
        <b-col cols="5">
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">開催日時</p>
            <b-row>
              <b-col sm="5"><label for="dateStr">開催日</label></b-col>
              <b-col sm="7" id="dateStr">
                <b-form-input v-model="seminerInfo.seminerDate.date" size="sm" type="date"></b-form-input>
                {{ seminerInfo.seminerDate.date }}
                <b-form-input v-model="seminerInfo.seminerDate.startTime" size="sm" type="time"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="7" id="dateStr">
                <b-form-input v-model="seminerInfo.seminerDate.endTime" size="sm" type="time"></b-form-input>
              </b-col>
                <!-- <div class="block">
                  <span class="demonstration">Default</span>
                  <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="Select date and time">
                  </el-date-picker>
                </div>
                <el-time-select
                  placeholder="Start time"
                  v-model="startTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
                </el-time-select>
                <el-time-select
                  placeholder="End time"
                  v-model="endTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: startTime
                  }">
                </el-time-select> -->
            </b-row>
          </b-card>
          <!-- イベント主催者 -->
          <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">主催者情報</p>
              <!-- <b-col cols="3">
               <b-img :src="this.getUserIcon" width="80" height="80"></b-img>
             </b-col>
             <b-col cols="9">
               <p>{{ this.getCurrentUserInfo.userName }}</p>
               <p>{{ this.getCurrentUserInfo.userBio }}</p>
             </b-col> -->
               <b-media>
                 <b-img v-if="this.getCurrentUserInfo.userIcon" slot="aside" :src="this.getCurrentUserInfo.userIcon" width="70" height="70" alt="placeholder" class="eyecatch"/>
                 <b-img v-else slot="aside" width="70" height="70" alt="placeholder" blank blank-color="#ccc" class="eyecatch" />
                 <h5 class="mt-0">{{ this.getCurrentUserInfo.userName }}</h5>
                 <p>{{ this.getCurrentUserInfo.userBio }}</p>
               </b-media>
          </b-card>
          <!-- <b-card header-tag="header" bg-variant="light" class="form-card">
            <p slot="header" class="mb-0 header-text">場所</p>
            <b-form-select v-model="seminerInfo.place" :options="canpassType" />
            <GmapMap
              :center="this.getCanpassType"
              :zoom="14"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="false"
                :draggable="false"
                @click="center=m.position"
              />
            </GmapMap>
          </b-card> -->
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
        detailMember: {
          name: '',
          capa: ''
        },
        seminerImage: '',
        seminerDate: {
          date: '',
          startTime: '',
          endTime: ''
        },
        description: '',
        ownerId: this.getUserId,
        value1: ''
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
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    // getCanpassType () {
    //   if (this.seminerInfo.place === 'meta') {
    //     return {lat: 35.566032, lng: 139.403646}
    //   } else if (this.markers[this.seminerInfo.place].position) {
    //     return this.markers[this.seminerInfo.place].position
    //   }
    // },
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) {
        return this.getCurrentUserInfo.userIcon
      }
    },
    getDescription () {
      if (this.seminerInfo.description) {
        return this.seminerInfo.description
      }
    }
  },
  updated: function () {
    console.log(this.seminerInfo)
  },
  methods: {
    ...mapActions('seminers/', {
      setNewSeminer: 'SET_NEW_SEMINER'
    }),
    onSeminerRegist () {
      console.log('currentUserId', this.getUserId)
      console.log('onckick regist button')
      this.seminerInfo.ownerId = this.getUserId
      this.setNewSeminer(this.seminerInfo)
      this.$router.push({ name: 'MainPage' })
      this.$swal({
        type: 'success',
        text: '登録しました！'
      })
    },
    cancelRegist () {
      this.$router.push('/mainpage')
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
  // mounted: function () {
  //   console.log(this.$route.params)
  //   if (this.$route.params.item) {
  //     let items = this.$route.params.item
  //     this.userInfo.userName = items.userName
  //     console.log(this.userInfo.userName)
  //   }
  // }
}
</script>

<style scoped>
.form-card{
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
}
</style>
