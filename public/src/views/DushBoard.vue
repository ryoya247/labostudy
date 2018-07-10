<template>
  <div class="dush-board">
    <b-container>
      <div class="list-title">
        <h1>ダッシュボード</h1>
        <b-tabs>
          <b-tab title="主催の勉強会">
            <b-card header-tag="header" class="intab-card">
              <p slot="header" class="mb-0">{{ this.getUserName }}さん主催の勉強会</p>
              {{ this.getCurrentMyseminers(this.getUserId) }}
            </b-card>
          </b-tab>
          <b-tab title="参加する勉強会">
            <b-card header-tag="header" class="intab-card">
              <p slot="header" class="mb-0">{{ this.getUserName }}さんの参加予定勉強会</p>
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { FullCalendar } from 'vue-full-calendar'

export default{
  name: 'DushBoard',
  components: {
    FullCalendar
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getCurrentMyseminers'
    ]),
    getUserName () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userName) return this.getCurrentUserInfo.userName
      else return ''
    }
  }
}
</script>
<style scoped>
.intab-card{
  margin: 30px;
}
</style>
