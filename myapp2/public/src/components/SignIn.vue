<template>
  <div class="signin">
    <b-container>
      <b-jumbotron bg-variant="light" text-variant="info">
        <template slot="header">
          Sign In
        </template>
        <template slot="lead">
          This is Sign In page.
        </template>
        <hr>
        <div class ="formwrapper">
          <b-container class='SignInForm'>
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
                  <b-button type="submit" variant="info">SignIn</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-container>
        </div>
          <hr>
          <b-row>
            <b-col><p>You don't have an account?</p></b-col>
            <b-col><router-link :to="{ name: 'Register' }">Go to Register page.</router-link></b-col>
          </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
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
