<template>
  <div>
    <div class="eventRegistHeader">
      <h2>イベント登録</h2>
      <b-button @click="onSeminerRegist">登録</b-button>
    </div>

      <b-row>
        <b-col cols="7">
          <!-- イベント名 -->
          <b-card title="イベント名" bg-variant="light" class="form-card">
            <b-form-input size="lg" type="text" placeholder="イベント名を入力" v-model="seminerInfo.title"></b-form-input>
          </b-card>

          <!-- 参加者詳細 -->
          <b-card title="参加者詳細" bg-variant="light" class="form-card">
            <b-row>
              <b-col cols="6">
                <label for="participation">参加枠名</label>
                <b-form-input v-model="seminerInfo.detailMember.name" id="participation" size="sm" type="text"></b-form-input>
              </b-col>
              <b-col cols="3">
                <label for="capacity">定員数</label>
                <b-form-input v-model="seminerInfo.detailMember.capa" id="capacity" size="sm" type="text"></b-form-input>
              </b-col>
              <b-col cols="3">
                <label for="avlorlot">先着 / 抽選</label>
                <b-form-select v-model="seminerInfo.detailMember.arrivalOrLottely" id="avlorlot" :options="arrivalOrLottely" size="sm" />
              </b-col>
            </b-row>
          </b-card>

          <!-- イベント画像 -->
          <b-card title="イベント画像" bg-variant="light" class="form-card">
              <b-button v-b-modal.SelPicModal>画像を選択</b-button>
              <b-modal id="SelPicModal" title="Select Picture">
                <croppa v-model="myCroppa"
                        :width="600"
                        :height="300"
                        :prevent-white-space="true"
                        :show-loading="true">
                </croppa>
              </b-modal>
          </b-card>

          <!-- イベント主催者 -->
          <b-card title="主催者情報" bg-variant="light" class="form-card">
            <b-row>
              <b-col cols="6">
               <b-img :src="this.getUserIcon" width="80" height="80"></b-img>
             </b-col>
             <b-col cols="6">
               <p>{{ this.getCurrentUserInfo.userName }}</p>
               <p>{{ this.getCurrentUserInfo.userEmail }}</p>
             </b-col>
             </b-row>
          </b-card>

          <!-- イベント詳細 -->
          <b-card title="イベント詳細" bg-variant="light" class="form-card">
            <b-form-textarea v-model="seminerInfo.description"
                             placeholder="MarkDownで書けるようにしたい"
                             :rows="10"
                             :max-rows="10"
                             :no-resize=true>
            </b-form-textarea>
          </b-card>

          <b-card title="Markdownプレビュー" bg-variant="light" class="form-card">
            <vue-markdown :source="seminerInfo.description"></vue-markdown>
          </b-card>
        </b-col>

        <!-- sidebar (right) -->
        <b-col cols="5">
          <b-card title="開催日時" bg-variant="light" class="form-card">
            <b-row>
              <b-col sm="5"><label for="dateStr">開始日時</label></b-col>
              <b-col sm="7" id="dateStr">
                <b-form-input v-model="seminerInfo.seminerDate.start.date" size="sm" type="date"></b-form-input>
                <b-form-input v-model="seminerInfo.seminerDate.start.time" size="sm" type="time"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="5"><label for="dateStr">終了日時</label></b-col>
              <b-col sm="7" id="dateStr">
                <b-form-input v-model="seminerInfo.seminerDate.end.date" size="sm" type="date"></b-form-input>
                <b-form-input v-model="seminerInfo.seminerDate.end.time" size="sm" type="time"></b-form-input>
              </b-col>
            </b-row>
          </b-card>
          <b-card title="場所" bg-variant="light" class="form-card">
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
          </b-card>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { storage } from '@/main'
import VueMarkdown from 'vue-markdown'

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
          capa: '',
          arrivalOrLottely: ''
        },
        seminerImage: '',
        seminerDate: {
          start: {
            date: '',
            time: ''
          },
          end: {
            date: '',
            time: ''
          }
        },
        place: 'meta',
        description: '',
        ownerId: this.getUserId
      },
      userInfo: {
        userName: '',
        userEmail: '',
        userBio: '',
        userIcon: ''
      },
      myCroppa: {},
      canpassType: [
        {
          value: 'aoyama',
          text: '青山キャンパス'
        },
        {
          value: 'sagamihara',
          text: '相模原キャンパス'
        }
      ],
      arrivalOrLottely: [
        {
          value: 'arrival',
          text: '先着'
        },
        {
          value: 'lottely',
          text: '抽選'
        }
      ],
      markers: {
        sagamihara: {
          position: {
            lat: 35.566032,
            lng: 139.403646
          }
        },
        aoyama: {
          position: {
            lat: 35.660374,
            lng: 139.709558
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    getCanpassType () {
      if (this.seminerInfo.place === 'meta') {
        return {lat: 35.566032, lng: 139.403646}
      } else if (this.markers[this.seminerInfo.place].position) {
        return this.markers[this.seminerInfo.place].position
      }
    },
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
  border: lightgray solid 5px;
  margin-bottom: 10px;
}
.eventRegistHeader{
  margin: 30px auto;
  display: flex;
  text-align: center;
}
.eventRegistHeader h2{
  font-weight: bold;
  text-align: center;
}
</style>
