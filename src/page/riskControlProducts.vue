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
                                <el-form-item label="姓名：">
                                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证：">
                                    <el-input v-model="form.identityCard" placeholder="请输入身份证号"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号：">
                                    <el-input v-model="form.phoneNum" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="授权书：">
                                    <el-input ref="file" type="file" name="file" id="authority"></el-input>
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
        name: '',
        identityCard: '',
        phoneNum: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const that = this
      const fileInput = document.getElementById('authority')
      const file = fileInput.files[0]
      const obj = JSON.parse(localStorage.getItem('userData'))
      let param = new FormData()
      if (file !== '') {
        param.append('file', file)
      }
      param.append('userName', obj.user)
      param.append('name', this.form.name)
      param.append('custIdCard', this.form.identityCard)
      param.append('phone', this.form.phoneNum)
      param.append('Authorization', obj.authorization)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      axios.post('/api/searchCredit', param, config, {
      }).then(res => {
        console.log(res)
        that.$router.push({
          name: 'secondQuery',
          params: {
            id_card: res.data.id_card,
            captcha_image: res.data.captcha_image,
            name: res.data.name,
            pin_pwd: res.data.pin_pwd,
            sid: res.data.sid,
            sms_duration: res.data.sms_duration,
            tel: that.form.phoneNum
          }
        })
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
