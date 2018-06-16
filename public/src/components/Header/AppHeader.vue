<template>
  <div class ='header'>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <!-- <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/> -->
            <b-dropdown no-caret>
              <template slot="button-content">
                <b-img  :src="'static/img/IMG_1680.PNG'" width="75" height="75" class="m-1" />
              </template>
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
import { mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  methods: {
    ...mapActions({
      destroySession: 'destroySession'
    }),
    logout () {
      firebase.auth().signOut()
        .then((user) => this.destroySession())
        .then(() => {
          console.log('destroySession:::::')
          this.$router.replace({ name: 'SignIn' })
        })
    }
  }
}

</script>
<style>
</style>
