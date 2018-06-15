<template>
  <div class="signin">
    <b-container>
      <b-jumbotron bg-variant="light" text-variant="info">
        <template slot="header">
          ログイン
        </template>
        <template slot="lead">
          これはログインページだよ
        </template>
        <hr>
        <div class ="formwrapper">
          <b-container class='SignInForm'>
              <b-form-group label='E-mail'>
                <b-form-input v-model='userEmail' type='email' placeholder='email' required></b-form-input>
              </b-form-group>
              <b-form-group label='パスワード'>
                <b-form-input v-model='password' type='password' placeholder='password' required></b-form-input>
              </b-form-group>
              <hr>
              <b-row class='buttons'>
                <!-- <b-col>
                  <b-button type="submit" variant="info">Register</b-button>
                </b-col> -->
                <b-col>
                  <b-button @click='onSignIn' variant="info">ログイン</b-button>
                </b-col>
              </b-row>
          </b-container>
        </div>
          <hr>
          <b-row>
            <b-col><p>アカウントがない？</p></b-col>
            <b-col><router-link :to="{ name: 'Register' }">ここから新規登録</router-link></b-col>
          </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  name: 'SignIn',
  data () {
    return {
      userEmail: '',
      password: ''
    }
  },
  methods: {
    onSignIn () {
      firebase.auth().signInWithEmailAndPassword(this.userEmail, this.password).then(
        (user) => {
          console.log('*** sign in ***')
          this.$router.push({ name: 'MainPage' })
        },
        (err) => {
          console.log('sign in failed', err)
        }
      )
    }
  }
}
</script>
<style>
.signin{
  max-width: 800px;
  margin: 15px auto;
}
.buttons{
  text-align: right;
}
.formwrapper{
  margin: 30px auto;
  background: #D3F0F4;
  border-radius: 10px;
}
.SignInForm{
  width: 60%;
  margin: 0 auto;
  padding: 30px 0;
}
</style>
