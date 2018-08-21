<template>
  <div class ='header'>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand @click="brandClick" href="#">Lab_Study</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button variant="info" @click="toDushBoard">ダッシュボード</b-button>
            <b-button variant="info" @click="makeSeminer">勉強会を作成</b-button>
            <b-button variant="info"><i class="far fa-question-circle" width="30px" height="30px"></i></b-button>
            <!-- <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/> -->
            <b-dropdown size="sm" variant="info" right>
              <template slot="button-content">
                <!-- <i class="far fa-user"></i> -->
                <b-img  v-if="this.getUserIcon" :src="this.getUserIcon" width="30" height="30" class="m-1" />
                <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="30" height="30" class="m-1" />
              </template>
                <b-dropdown-item-button size="sm" class="my-2 my-sm-0" @click="toProfile">{{ this.getUserName }}</b-dropdown-item-button>
                <b-dropdown-item-button size="sm" class="my-2 my-sm-0" @click="toMySeminerList">参加リスト</b-dropdown-item-button>
                <b-dropdown-item-button size="sm" class="my-2 my-sm-0" @click="logout">ログアウト</b-dropdown-item-button>
            </b-dropdown>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import firebase from 'firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'getCurrentUserInfo'
    ]),
    getUserIcon: function () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userIcon) return this.getCurrentUserInfo.userIcon
      else return ''
    },
    getUserName: function () {
      if (this.getCurrentUserInfo && this.getCurrentUserInfo.userName) return this.getCurrentUserInfo.userName
      else return ''
    }
  },
  methods: {
    ...mapActions({
      destroySession: 'destroySession'
    }),
    makeSeminer () {
      this.$router.push({ name: 'SeminerRegist' })
    },
    toMySeminerList () {
      this.$router.push({ name: 'SeminerMyList' })
    },
    brandClick () {
      this.$router.replace({ name: 'MainPage' })
    },
    toDushBoard () {
      this.$router.push({ name: 'DushBoard' })
    },
    toProfile () {
      this.$router.push({ name: 'Profile' })
    },
    logout () {
      this.$swal({
        title: '確認',
        text: 'ログアウトしますか？',
        type: 'question',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          firebase.auth().signOut()
            .then((user) => this.destroySession())
            .then(() => {
              this.$router.replace({ name: 'SignIn' })
            })
          this.$swal({
            title: 'ログアウトしました',
            type: 'success'
          })
        }
      })
    }
  }
}

</script>
<style>

</style>
