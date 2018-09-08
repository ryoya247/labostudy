<template>
  <div class = 'mainpage'>
    <b-container>
      <h3 class="page_title">勉強会リスト</h3>
      <p>ハロー、{{ this.getUserName }}さん！</p>
      <b-row>
          <b-col cols="10">
            <div v-for="(seminer, index) in getSeminers" :key="index">
              <seminer v-if="index != '.key' && seminer" :seminer="seminer" :seminerId="index" :type="'list'"></seminer>
            </div>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import seminer from '@/components/seminer.vue'

export default {
  data () {
    return {
      userInfo: {
        userName: '',
        userEmail: '',
        userBio: '',
        userIcon: ''
      }
    }
  },
  components: {
    seminer
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUser',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getSeminers'
    ]),
    ...mapGetters('people/', [
      'getUserInfoByUserId'
    ]),
    getUserName () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userName) return this.getCurrentUserInfo.userName
      else return ''
    },
    getUserEmail () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userEmail) return this.getCurrentUserInfo.userEmail
      else return ''
    },
    getUserBio () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userBio) return this.getCurrentUserInfo.userBio
      else return ''
    },
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) return this.getCurrentUserInfo.userIcon
      else return ''
    }
  },
  created () {
    console.log('::MainPage created::')
    let seminerIdsArray = []
    let seminerIds = this.getSeminers
    for (let seminerId in seminerIds) {
      if (seminerId !== '.key') {
        seminerIdsArray.push(seminerId)
      }
    }
    console.log(seminerIdsArray)
  },
  methods: {

  }
}

</script>
<style scoped>

</style>
