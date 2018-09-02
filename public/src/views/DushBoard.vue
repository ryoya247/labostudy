<template>
  <div class="dush-board">
    <b-container>
      <h3 class="page_title">ダッシュボード</h3>
      <b-row>
        <b-col cols="7">
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
        </b-col>
        <b-col cols="5">
          <b-card>
            次の勉強会
            <b-card-body>
              <div v-for="(seminer, index) in this.getLatedAttendSeminer" :key="index">
                <seminer :seminer=seminer :type="'dashboard_lated_seminer'"></seminer>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import seminer from '@/components/seminer.vue'

export default{
  name: 'DushBoard',
  components: {
    seminer
  },
  data () {
    return {

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
      'getSeminersById',
      'getLatedAttendSeminer'
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
