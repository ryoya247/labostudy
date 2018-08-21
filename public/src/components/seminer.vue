<template>
  <div v-if="type === 'list'">
    <div class="seminer_component">
      <b-card header-tag="header">
        <div slot="header" class="header-group">
          <b-row>
            <b-col cols="10">
              <p class="mb-0"><router-link :to="{ name: 'SeminerDetail', params: { oid: seminer.ownerId, sid: seminerId } }" class="title-link">{{ seminer.title }}</router-link></p>
            </b-col>
            <b-col cols="2">
              <div v-if="checkSeminerOwner">
                <b-button class="header-button mb-0 header-owner" variant="info" disabled>主催</b-button>
              </div>
              <div v-else>
                <b-button class="header-button mb-0 header-owner" variant="primary" @click="toSeminerDetail">詳細を見る</b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              {{ seminer.seminerDate.date }} {{ seminer.seminerDate.startTime }}~
            </b-col>
          </b-row>
        </div>
          <b-media>
            <b-img v-if="seminer.seminerImage" slot="aside" :src="seminer.seminerImage" width="150" height="100" alt="placeholder" class="eyecatch"/>
            <b-img v-else slot="aside" width="70" height="70" alt="placeholder" blank blank-color="#ccc" class="eyecatch" />
            {{ seminer.subtitle }}
          </b-media>
        <b-card-body class="test">
          <div class="inCard-user">
            <b-img v-if="this.getUserInfoByUserId(seminer.ownerId).userIcon"  :src="this.getUserInfoByUserId(seminer.ownerId).userIcon" width="20" height="20"/>
            <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="30" height="30"/>
             {{ this.getUserInfoByUserId(seminer.ownerId).userName }}
          </div>
          <p>参加人数：{{ this.getAttendMembersNum }}人</p>
        </b-card-body>
      </b-card>
    </div>
  </div>

  <!-- ダッシュボード、主催の勉強会 -->
  <div v-else-if="type === 'dashboard_my'">
    <div class="seminer-component">
      <b-card header-tag="header">
        <div slot="header" class="header-group">
          <b-row>
            <b-col cols="8">
              <h4 class="mb-0">{{ seminer.title }}</h4>
            </b-col>
            <b-col cols="4">
              <b-button class="header-button mb-0" variant="success">
                <i class="far fa-edit"></i></b-button>
              <b-button class="header-button mb-0" variant="danger" style="margin-right: 5px;" @click="deleteMySeminer(seminerId)"><i class="far fa-trash-alt"></i></b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              {{ seminer.seminerDate.date }}
            </b-col>
          </b-row>
        </div>
      </b-card>
    </div>
  </div>

  <!-- ダッシュボード、参加する勉強会 -->
  <div v-else-if="type === 'dashboard-part'">
    <div class="seminer-component">
      <b-card header-tag="header">
        <div slot="header" class="header-group">
          <b-row>
            <b-col cols="12">
              <h4 class="mb-0">{{ seminer.title }}</h4>
            </b-col>

          </b-row>
          <b-row>
            <b-col cols="12">
              {{ seminer.seminerDate.date }}
            </b-col>
          </b-row>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default{
  name: 'seminer',
  components: {
    VueMarkdown
  },
  props: {
    seminer: {
    },
    type: {
      type: String
    },
    seminerId: {
      default: '',
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getUserId'
    ]),
    ...mapGetters('peoples/', [
      'getUserInfoByUserId'
    ]),
    ...mapGetters('seminers/', [
      'getCurrentMyseminers'
    ]),
    checkSeminerOwner () {
      if (this.getUserId === this.seminer.ownerId) {
        return true
      } else {
        return false
      }
    },
    getAttendMembersNum () {
      if (this.seminer.attendUsers) {
        return Object.keys(this.seminer.attendUsers).length
      }
    }
  },
  methods: {
    ...mapActions('seminers/', {
      addUserToSeminer: 'ADD_USER_TO_SEMINER',
      removeMySeminer: 'REMOVE_MY_SEMINER'
    }),
    toParent () {
      console.log('button clicked')
      this.$emit('openDetail')
    },
    toSeminerDetail () {
      this.$router.push({ name: 'SeminerDetail', params: { oid: this.seminer.ownerId, sid: this.seminerId } })
    },
    deleteMySeminer (seminerId) {
      this.$swal({
        title: '確認',
        text: '勉強会を削除しますか？',
        type: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result) {
          this.removeMySeminer(seminerId)
        }
      })
    }
  }
}
</script>
<style scoped>
.header-button{
  float: right;
  font-size: 0.8rem;
}
.header-owner{
  border-radius: 30px;
}
.seminer_component{
  margin-bottom: 10px;
}
.title-link{
  text-decoration: none;
  color: black;
}
.title-link:hover{
  color: gray;
}
.inCard-user{
  display: flex;
}
.eyecatch{
  object-fit: cover;
  border: 2px dashed lightgray;
}
.test{
  padding: 0;
}
</style>
