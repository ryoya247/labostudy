<template>
  <b-container>
    <h2 class="page_title">勉強会詳細</h2>
    <b-row>
      <b-col cols="10">
        <b-card v-if="getParamsSeminer">
          <h3>{{ getParamsSeminer.title }}</h3>
          <p>{{ getParamsSeminer.subtitle }}</p>
          <img :src="getParamsSeminer.seminerImage" width="100%"/>

          <div v-if="getParamsSeminer.attendUsers">
            <p>参加者一覧</p>
            <div v-for="(val, userId) in getParamsSeminer.attendUsers" :key="userId">
              <div>
                <b-img v-if="getUserInfoByUserId(userId).userIcon"  :src="getUserInfoByUserId(userId).userIcon" width="20" height="20"/>
                <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="30" height="30"/>
                <router-link @click.prevent :to="{ name: 'User', params: { userId: userId } }" class="title-link">{{ getUserInfoByUserId(userId).userName }}</router-link>
              </div>
            </div>
          </div>
        </b-card>
        <b-button @click="onAttendButton">参加する</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default{
  name: 'SeminerDetail',
  components: {
    VueMarkdown
  },
  data () {
    return {
      params_seminerId: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUserId',
      'getCurrentUserInfo'
    ]),
    ...mapGetters('seminers/', [
      'getSeminerBySeminerId'
    ]),
    ...mapGetters('people/', [
      'getUserInfoByUserId'
    ]),
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) {
        return this.getCurrentUserInfo.userIcon
      }
    },
    getParamsSeminer () {
      if (this.params_seminerId) {
        return this.getSeminerBySeminerId(this.params_seminerId)
      }
    }
  },
  updated: function () {
    console.log('updated', this.seminer)
  },
  mounted: function () {
    if (this.$route.params) {
      let seminerId = this.$route.params.seminerId
      this.params_seminerId = seminerId
    }
  },
  methods: {
    ...mapActions('seminers/', {
      addUserToSeminer: 'ADD_USER_TO_SEMINER'
    }),
    onAttendButton () {
      this.$swal({
        title: '確認',
        text: 'この勉強会に参加しますか？',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
          console.log(this.addUserToSeminer(this.params_seminerId))
          this.$swal({
            title: '参加しました。',
            type: 'success'
          })
          this.$router.push({ name: 'SeminerList' })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
