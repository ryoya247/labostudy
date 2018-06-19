<template>
  <div>
    <!-- <b-container> -->
      <b-row>
        <b-col cols="8">
          <b-card title="イベント名" bg-variant="light" class="form-card">
            <b-form-input size="sm" type="text" placeholder="イベント名を入力" v-model="seminerInfo.seminerTitle"></b-form-input>
            {{ this.seminerInfo.seminerTitle }}
          </b-card>
          <b-card title="参加者詳細" bg-variant="light" class="form-card">

          </b-card>

          <b-card title="イベント画像" bg-variant="light" class="form-card">
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
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card title="開催日時" bg-variant="light" class="form-card">
            <b-row>
              <b-col sm="5"><label for="dateStr">開始日時</label></b-col>
              <b-col sm="7" id="dateStr">
                <b-form-input size="sm" type="date"></b-form-input>
                <b-form-input size="sm" type="time"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="5"><label for="dateStr">終了日時</label></b-col>
              <b-col sm="7" id="dateStr">
                <b-form-input size="sm" type="date"></b-form-input>
                <b-form-input size="sm" type="time"></b-form-input>
              </b-col>
            </b-row>
          </b-card>
          <b-card title="場所" bg-variant="light" class="form-card">
            <b-form-select v-model="selectedCanpassType" :options="canpassType" />
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
    <!-- </b-container> -->
  </div>
</template>

<script>
export default{
  data () {
    return {
      seminerInfo: {
        seminerTitle: ''
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
      selectedCanpassType: 'meta',
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
    getCanpassType () {
      if (this.selectedCanpassType === 'meta') {
        return {lat: 35.566032, lng: 139.403646}
      } else if (this.markers[this.selectedCanpassType].position) {
        return this.markers[this.selectedCanpassType].position
      }
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
</style>
