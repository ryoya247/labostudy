<template>
  <div class = 'register'>
    <b-container>
      <b-jumbotron bg-variant='light' text-variant='info'>
        <template slot='header'>
          Lab_Study
        </template>
        <template slot='lead'>
          <h3>新規登録</h3>
        </template>
        <hr>
        <div class ="formwrapper">
        <b-container class='SignUpForm'>
            <b-form-group label='E-mail'>
              <b-form-input v-model='email' type='email' placeholder='email' required></b-form-input>
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
                <b-button @click='onSubmit' variant="info">登録</b-button>
              </b-col>
            </b-row>
        </b-container>
      </div>
        <hr>
        <b-row>
          <b-col><p>既にアカウントを持ってる？</p></b-col>
          <b-col><router-link :to="{ name: 'SignIn' }">ここからログイン</router-link></b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      setNewUser: 'SET_NEW_USER'
    }),
    onSubmit: function () {
      console.log('onSubmit')
      const $router = this.$router
      if (this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          function (user) {
            console.log('register: success', user.uid)
            $router.push({
              name: 'ProfileRegist',
              params: { userEmail: user.email }
            })
          },
          function (error) {
            var errorCode = error.code
            console.log(errorCode)
          }
        )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 50px;
}
.register{
  max-width: 600px;
  margin: 60px auto;
}
.buttons{
  text-align: right;
}
.formwrapper{
  margin: 30px auto;
  background: #D3F0F4;
  border-radius: 10px;
}
.SignUpForm{
  width: 80%;
  padding: 30px 0;
  margin: 0 auto;
}
</style>
