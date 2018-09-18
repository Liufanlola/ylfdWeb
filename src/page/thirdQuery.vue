<template>
    <el-container class="riskForm">
        <el-main>
            <el-row class="backIndex">
                <router-link to="/enter/" tag='div'><i class="iconfont icon-jiantouarrowhead7"></i><span>返回首页</span></router-link>
            </el-row>
            <el-row type="flex" align="middle" justify="center" class="form-list">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" class="grid-content">
                    <el-row>
                        <el-col :span="16" :offset="4">
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="短信验证码：" v-show="$route.params.sms_duration === '120'">
                                    <el-input v-model="form.smsDuration" placeholder="请输入短信验证码"></el-input>
                                </el-form-item>
                                <el-form-item label="图形验证码：" v-show="$route.params.captcha_image !== ''">
                                    <el-input v-model="form.captchaImage" placeholder="请输入图形验证码"><template slot="append">{{ $route.params.captcha_image }}</template></el-input>
                                </el-form-item>
                                <el-form-item>
                                <el-button type="primary" @click="onSubmit" class="btn-login">立即查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
import axios from 'axios'
export default {
  name: 'phoneState',
  data () {
    return {
      form: {
        smsDuration: '',
        captchImage: ''
      }
    }
  },
  mounted () {
    console.log(this.$route.params)
  },
  methods: {
    onSubmit () {
      const obj = JSON.parse(localStorage.getItem('userData'))
      let param = new FormData()
      let param2 = new FormData()
      param.append('userName', obj.user)
      param.append('Authorization', obj.authorization)
      param.append('tel', this.$route.params.tel)
      param.append('sid', this.$route.params.sid)

      if (this.$route.params.sms_duration === '120') {
        param.append('sms_code', this.form.smsDuration)
      }
      if (this.$route.params.captch_code !== '') {
        param.append('captcha_code', this.form.captchImage)
      }
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post('/api/dhb/sendSecondMessage', param, config, {
      }).then(res => {
        console.log(res)
        if (res.data.status !== '0') {
          this.$message(res.data.msg)
        } else {
          param2.append('userName', obj.user)
          param2.append('Authorization', obj.authorization)
          param2.append('tel', this.$route.params.tel)
          param2.append('sid', this.$route.params.sid)
          param2.append('name', this.$route.params.name)
          param2.append('card', this.$route.params.id_card)
          axios.post('/api/dhb/getData', param2, {
          }).then(res => {
            console.log(res)
          }).catch(res => {
            console.log(res)
          })
        }
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
    .riskForm{
        .el-main{
            background: url('../../static/images/phoneState_bg.png') no-repeat center center;
            background-size: cover;
            position: relative;
            height: 100vh;
        }
        .form-list{
            height: 97%;
        }
        .backIndex{
            color: #758280;
            font-size: 20px;
            cursor: pointer;
        }
        .grid-content{
            background-color: #fff;
            box-shadow: 0 0 10px #d0fcfc;
            padding-top: 100/1080*112vh;
            padding-bottom:100/1080*55vh;
        .el-form-item__label{
            font-size: 16px;
        }
        .el-input-group__append{
            background-color:#3cd6c6;
            color:#fff;
        }
    }
    .el-form-item{
        margin-bottom:100/1080*45vh;
    }
    .el-input__inner{
        border-radius: 0px;
        border: 1px solid #04bed3;
    }
    .el-form-item__label{
        color: #000000;
        font-weight: bold;
    }
    .el-upload__tip{
        margin-left: 10px;
    }
}
</style>
