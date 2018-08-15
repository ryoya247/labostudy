<template>
  <div class="dush-board">
    <b-container>
      <div class="list-title">
        <h1>ダッシュボード</h1>
        <b-row>
          <b-col cols="12">
            <b-tabs>
              <b-tab title="主催の勉強会">
                <div class="intab-card">
                  <div v-for="(seminer, index) in this.getCurrentMyseminers(this.getUserId)" :key="index">
                    <seminer :seminer="seminer" :seminerId="index" :type="'dashboard-my'"></seminer>
                  </div>
                </div>
              </b-tab>
              <b-tab title="参加する勉強会">
                <div class="intab-card">
                  <div v-for="(mysem, seminerKey) in getParticipateSeminers" :key="seminerKey">
                    <div v-for="(mySeminer, index) in getSeminersById(seminerKey)" :key="index">
                        <seminer :seminer="mySeminer" :seminerId="index" :type="'dashboard-part'"></seminer>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
                <full-calendar :events="events" :config="this.config" ref="calender"></full-calendar>
          </b-col>
        </b-row>
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
      events: [
        {
          title: 'event1',
          start: '2018-07-17'
        },
        {
          title: 'event2',
          start: '2010-01-05',
          end: '2010-01-07'
        },
        {
          title: 'event3',
          start: '2010-01-09T12:30:00',
          allDay: false
        }
      ],
      config: {
        local: 'ja'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getCurrentMyseminers',
      'getParticipateSeminers',
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
</style>
