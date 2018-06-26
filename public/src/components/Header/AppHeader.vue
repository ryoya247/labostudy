<template>
  <div class ='header'>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Lab_Study</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!-- <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/> -->
            <b-dropdown size="lg" right>
              <template slot="button-content">
                <i class="far fa-user"></i>
              </template>
              <div class="navbar-profile">
                <b-img  v-if="this.getUserIcon" :src="this.getUserIcon" width="60" height="60" class="m-1" />
                <b-img  v-else :src="'static/img/IMG_1680.PNG'" width="60" height="60" class="m-1" />
                {{ this.getUserName }}
              </div>
                <b-dropdown-item-button size="sm" class="my-2 my-sm-0">プロフィール</b-dropdown-item-button>
                <b-dropdown-item-button size="sm" class="my-2 my-sm-0"  @click="logout">ログアウト</b-dropdown-item-button>
            </b-dropdown>
          </b-nav-form>
          <!-- <b-nav-item-dropdown right>
            Using button-content slo
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown> -->
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
              console.log('destroySession:::::')
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
.navbar-profile{
  display: flex;
}
</style>
