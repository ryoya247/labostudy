<template>
  <div class="dush-board">
    <b-container>
      <h3 class="page_title">ダッシュボード</h3>
        <div class="calender">
          <div class="inner-calender">
            <full-calendar class="fullcalendar" :config="this.config" ref="calender" height="600"></full-calendar>
          </div>
        </div>
        <div class="tabs_tabs">
          <b-tabs>
            <b-tab title="主催の勉強会">
              <div class="intab-card">
                <div v-for="(seminer, index) in this.getCurrentMyseminers(this.getUserId)" :key="index">
                  <seminer :seminer="seminer" :seminerId="index" :type="'dashboard_my'"></seminer>
                </div>
              </div>
            </b-tab>
            <b-tab title="参加する勉強会">
              <div class="intab-card">
                <div v-for="(seminer, index) in this.getCurrentAttendSeminers(this.getUserId)" :key="index">
                  <seminer :seminer="seminer" :seminerId="index" :type="'dashboard_attend'"></seminer>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </div>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/ja'
import seminer from '@/components/seminer.vue'

export default{
  name: 'DushBoard',
  components: {
    FullCalendar,
    seminer
  },
  data () {
    return {
      config: {
        local: 'ja',
        defaultView: 'month'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getCurrentAttendSeminers',
      'getCurrentMyseminers',
      'getSeminersById'
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
.flex{
  display: flex;
}
.tabs_tabs{
  min-width: 50%;
}
</style>
