<template>
  <div class = 'mainpage'>
    <b-container>
      <div class="list-title">
        <h1>List</h1>
      </div>
      <p>ハロー、{{ this.getUserName }}さん！</p>
      <b-row>
          <b-col cols="12" md="7" class="md_overflow">
            <div v-for="(seminer, index) in getSeminers" :key="index">
              <seminer v-if="index != '.key' && seminer" :seminer="seminer" :seminerId="index" :type="'list'"></seminer>
            </div>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import firebase from 'firebase'
import { mapGetters } from 'vuex'
// import { FullCalendar } from 'vue-full-calendar'
import seminer from '@/components/seminer.vue'

export default {
  // components: {
  //   FullCalendar,
  // },
  data () {
    return {
      myCroppa: {},
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
  },
  mounted () {
    console.log('getSeminers', Object.keys(this.getSeminers))
  },
  methods: {
    // openDetail () {
    //   if (!this.open) {
    //     console.log('this.open = true')
    //     this.open = true
    //   } else if (this.open) {
    //     console.log('this.open = false')
    //     this.open = false
    //   }
    // }
  //   makeSeminer () {
  //     console.log(this.getUserId)
  //     // this.$router.push({ name: 'SeminerRegist', params: { item: this.userInfo } })
  //     this.$router.push({ name: 'SeminerRegist' })
  //   },
  //   toMySeminerList () {
  //     this.$router.push({ name: 'SeminerMyList' })
  //   }
  }
}

</script>
<style scoped>
/* .make-seminer, .participate-seminer{
  margin-top: 20px;
  margin-right: 5px;
} */
/* .make-seminer{
  margin-left: auto;
} */
.md_overflow{
  height: 1000px;
  overflow: auto;
}
.list-title{
  /* margin-bottom: 5px; */
  margin-top: 5px;
  /* display: flex; */
}

</style>
