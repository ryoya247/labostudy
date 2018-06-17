<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="8">
          <b-card bg-variant="light" class="form-card">
            <label for="inputSeminerTitle">イベント名</label>
            <b-form-input id="inputSeminerTitle" size="lg" type="text" placeholder="イベント名を入力" v-model="seminerInfo.seminerTitle"></b-form-input>
            {{ this.seminerInfo.seminerTitle }}
          </b-card>
          <b-card bg-variant="light" class="form-card">
            参加者受け付け方法
          </b-card>

          <b-card bg-variant="light" class="form-card">
            イベント画像
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
          <b-card bg-variant="light" class="form-card">
            開催日時
          </b-card>
          <b-card bg-variant="light" class="form-card">
            場所
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
      myCroppa: {}
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
  margin-bottom: 10px;
}
</style>
