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
        <h6 slot="header" class="header-text">{{ seminerDate.start.date }} / {{ seminerDate.start.time }}〜 {{seminerDate.end.date}} / {{seminerDate.end.time}}</h6>
        <b-button slot="header" class="header-button">参加</b-button>
      <b-media>
        <b-img v-if="this.getUserInfoByUserId(ownerId).userIcon" slot="aside" :src="this.getUserInfoByUserId(ownerId).userIcon" width="50" height="50"/>
        <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="50" height="50"/>
      </b-media>
      {{ this.getUserInfoByUserId(ownerId).userName }}

    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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

    }
  },
  computed: {
    ...mapGetters('peoples/', [
      'getUserInfoByUserId'
    ])
  }
}
</script>
<style scoped>
.header-text{
  float: left;
}
.header-button{
  float: right;
}
.seminer-component{
  margin: 10px 0;
}
</style>
