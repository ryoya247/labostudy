<template>
  <div class="seminer-component">
    <!-- <b-card bg-variant="light">
      <b-row>
        <b-col cols="4">
          <b-img v-if="this.getUserIcon" :src="this.getUserIcon" width="50" height="50"/>
          <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="50" height="50"/>
          {{ title }}
        </b-col>
        <b-col cols="7">
          <p>日付 {{ seminerDate.start.date }} / 開始 {{ seminerDate.start.time }}</p>
          {{ detailMember.capa }}
        </b-col>
        <b-col cols="1">
          <b-button>参加</b-button>
        </b-col>
      </b-row>
      <vue-markdown>{{ description }}</vue-markdown>
    </b-card> -->
    <b-card header-tag="header">
      <!-- <div slot="header" class="card-header">
        <h6>{{ seminerDate.start.date }} / {{ seminerDate.start.time }}〜</h6>
        <b-button>参加</b-button>
      </div> -->
      <div slot="header" class="header-group">
        <p class="mb-0">{{ seminerDate.start.date }} / {{ seminerDate.start.time }}〜 {{seminerDate.end.date}} / {{seminerDate.end.time}}</p>
        <b-button v-if="checkSeminerOwner" class="header-button mb-0" variant="primary" @click="onParticipate">参加</b-button>
        <b-button v-else class="header-button mb-0" variant="info" disabled>あなたが主催</b-button>
      </div>
      <b-media>
        <h6 style="font-weight: bold">{{ this.getUserInfoByUserId(ownerId).userName }}</h6>
        <h6>{{ this.getUserInfoByUserId(ownerId).userEmail }}</h6>
        <b-img v-if="this.getUserInfoByUserId(ownerId).userIcon" slot="aside" :src="this.getUserInfoByUserId(ownerId).userIcon" width="50" height="50"/>
        <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="50" height="50"/>
      </b-media>
      <b-card-body>
        <!-- <b-button v-b-toggle.collapse>{{ title }}</b-button>
        <b-collapse id="collapse">
          <b-card>
            <vue-markdown>{{ description }}</vue-markdown>
          </b-card>
        </b-collapse> -->
        <b-button @click="toParent">{{ title }}</b-button>
      </b-card-body>

    </b-card>
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
    title: {
      default: '',
      type: String
    },
    ownerId: {
      default: '',
      type: String
    },
    seminerDate: {
    },
    detailMember: {
    },
    itemId: {
      default: '',
      type: String
    },
    description: {
      type: String
    }
  },
  data () {
    return {
      id: 'collapse'
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
      if (this.getUserId === this.ownerId) {
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
          console.log(this.addUserToSeminer(this.itemId))
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
.header-group{
  display: flex;
}
.header-button{
  margin-left: auto;
}
.seminer-component{
  margin-bottom: 10px;
}
</style>
