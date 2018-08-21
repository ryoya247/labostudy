<template>
  <b-container>
    <h2 class="page_title">勉強会詳細</h2>
    <b-row>
      <b-col cols="7">
        <b-card>
          <b-img v-if="seminer.seminerImage" :src="seminer.seminerImage" width="200" alt="placeholder"/>
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
      params_oid: '',
      params_sid: '',
      seminer: {}
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
    getUserIcon () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) {
        return this.getCurrentUserInfo.userIcon
      }
    }
  },
  mounted: function () {
    console.log(this.$route.params)
    if (this.$route.params) {
      this.params_oid = this.$route.params.oid
      this.params_sid = this.$route.params.sid
      this.seminer = this.getSeminerBySeminerId(this.params_sid)
    } else {
      this.$router.replace('MainPage')
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
          console.log(this.addUserToSeminer(this.params_sid))
          this.$swal({
            title: '参加しました。',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
