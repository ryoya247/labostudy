<template>
  <div v-if="type === 'list'">
    <div class="seminer-component">
      <b-card header-tag="header">
        <div slot="header" class="header-group">
          <b-row>
            <b-col cols="10">
              <h4 class="mb-0"><router-link :to="{ name: 'SeminerDetail', params: { oid: seminer.ownerId, sid: seminerId } }" class="title-link">{{ seminer.title }}</router-link></h4>
            </b-col>
            <b-col cols="2">
              <div v-if="!checkSeminerOwner">
                <b-button class="header-button mb-0 header-owner" variant="info" disabled>主催</b-button>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
            {{ seminer.seminerDate.start.date }} {{ seminer.seminerDate.start.time }}~
          </b-col>
          </b-row>
        </div>
        <div class="inCard-user">
          <b-media>
            <b-img v-if="seminer.seminerImage" slot="aside" :src="seminer.seminerImage" width="100" height="100" alt="placeholder" class="eyecatch"/>
            <b-img v-else slot="aside" width="100" height="100" alt="placeholder" blank blank-color="#ccc" class="eyecatch" />
          </b-media>

          <b-img v-if="this.getUserInfoByUserId(seminer.ownerId).userIcon"  :src="this.getUserInfoByUserId(seminer.ownerId).userIcon" width="30" height="30"/>
          <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="50" height="50"/>
          <h6 style="font-weight: bold">{{ this.getUserInfoByUserId(seminer.ownerId).userName }}</h6>
        </div>
        <b-card-body>
          <!-- <b-button @click="toParent">{{ title }}</b-button> -->
        </b-card-body>
      </b-card>
    </div>
  </div>

  <!-- ダッシュボード、主催の勉強会 -->
  <div v-else-if="type === 'dashboard-my'">
    <div class="seminer-component">
      <b-card header-tag="header">
        <div slot="header" class="header-group">
          <b-row>
            <b-col cols="8">
              <h4 class="mb-0">{{ seminer.title }}</h4>
            </b-col>
            <b-col cols="4">
              <b-button class="header-button mb-0" variant="success">編集</b-button>
              <b-button class="header-button mb-0" variant="danger" style="margin-right: 5px;">削除</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              {{ seminer.seminerDate.start.date }}
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
              {{ seminer.seminerDate.start.date }}
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
    checkSeminerOwner () {
      if (this.getUserId === this.seminer.ownerId) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions('seminers/', {
      addUserToSeminer: 'ADD_USER_TO_SEMINER'
    }),
    onParticipate () {
      this.$swal({
        title: '確認',
        text: 'この勉強会に参加しますか？',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
          console.log(this.addUserToSeminer(this.seminerId))
          this.$swal({
            title: '参加しました。',
            type: 'success'
          })
        }
      })
    },
    toParent () {
      console.log('button clicked')
      this.$emit('openDetail')
    }
  }
}
</script>
<style scoped>
/* .header-group{
  display: flex;
} */
.header-button{
  float: right;
}
.header-owner{
  border-radius: 30px;
}
.seminer-component{
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
</style>
