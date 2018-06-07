<template>
  <div class = 'register'>
    <b-container>
      <b-jumbotron bg-variant='light' text-variant='info'>
        <template slot='header'>
          Register
        </template>
        <template slot='lead'>
          This is Register page. You have to fill in the all blanks.
        </template>
        <hr>
        <div class ="formwrapper">
        <b-container class='SignUpForm'>
          <b-form @submit='onSubmit'>
            <b-form-group label='Your email'>
              <b-form-input v-model='email' type='email' placeholder='email' required></b-form-input>
            </b-form-group>
            <b-form-group label='Password'>
              <b-form-input v-model='password' type='text' placeholder='password' required></b-form-input>
            </b-form-group>
            <hr>
            <b-row class='buttons'>
              <!-- <b-col>
                <b-button type="submit" variant="info">Register</b-button>
              </b-col> -->
              <b-col>
                <b-button type="submit" variant="info">Register</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </div>
        <hr>
        <b-row>
          <b-col><p>You already have an account??</p></b-col>
          <b-col><router-link :to="{ name: 'SignIn' }">Go to SignIn page.</router-link></b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      console.log('onSubmit')
      const $router = this.$router
      if (this.email && this.password) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          function (user) {
            console.log('registuser: success')
            let userEmail = this.email
            $router.push({ name: 'ProfileRegist', params: userEmail })
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
.register{
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
.SignUpForm{
  width: 60%;
  padding: 30px 0;
  margin: 0 auto;
}
</style>
