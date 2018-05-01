<template>
  <div class = 'profile'>
    <b-container>
      <b-jumbotron bg-variant='light' text-variant='info'>
        <template slot='header'>
          Profile Register
        </template>
        <template slot='lead'>
          続いてあなたのプロフィールを登録しましょう。<br>ニックネームは必須項目ですのでご注意を！
        </template>
        <hr>
        <div class = "formwrapper">
          <b-container class='registForm'>
            <!-- <b-form @submit='onSubmit'> -->
              <b-form-group label="Profile Picture">
                <div>
                  <b-btn v-b-modal.SelPicModal>Select Picture</b-btn>
                  <b-modal id="SelPicModal" title="Select Picture">
                    <croppa v-model="myCroppa"></croppa>
                  </b-modal>
                </div>
              </b-form-group>
              <b-form-group label='Your Name'>
                <b-form-input v-model='userName' type='text' placeholder='name' required></b-form-input>
              </b-form-group>
              <b-form-group label="comment">
                <b-form-textarea v-model='userComment' placeholder='comment' :rows='5' :max-rows='8'></b-form-textarea>
              </b-form-group>
              <hr>
              <b-row class='buttons'>
                <b-col>
                  <b-button type="submit" @click="onRegister" variant="info">保存</b-button>
                </b-col>
              </b-row>
            <!-- </b-form> -->
          </b-container>
        </div>
      </b-jumbotron>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'ProfileRegist',
  data () {
    return {
      userName: '',
      userComment: '',
      myCroppa: {}
    }
  },
  methods: {
    onRegister () {
      console.log('click onRegister true')
    }
  }
}
</script>
<style scoped>
.profile{
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
.registForm{
  width: 60%;
  padding: 30px 0;
  margin: 0 auto;
}
</style>
