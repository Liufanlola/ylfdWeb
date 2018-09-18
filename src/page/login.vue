<template>
    <el-container>
        <el-main>
            <el-row type="flex" align="middle">
                <el-col :xs="{span:12,offset:10}" :sm="{span:12,offset:10}" :md="{span:6,offset:14}" :lg="{span:6,offset:14}">
                    <div class="grid-content">
                        <h2>账号登录</h2>
                        <el-form ref="form" label-width='80px'>
                            <div class="form-item">
                                <el-input placeholder="请输入用户名" v-model="userName" class="userName"></el-input>
                            </div>
                            <div class="form-item">
                                <el-input placeholder="请输入密码" type='password' v-model="password" class="password"></el-input>
                            </div>
                            <el-button type="submit" class="btn-login" @click='login'>登录</el-button>
                            <div class="forget-password" @click="open">忘记密码?</div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      const newPassword = md5(this.password).toUpperCase()
      this.$http.post('/api/userLogin', {username: this.userName, password: newPassword}, {
        headers: {
        },
        emulateJSON: true
      }).then(res => {
        const userInfo = {
          user: this.userName,
          authorization: res.body.data.Authorization
        }
        let newUserInfo = JSON.stringify(userInfo)
        localStorage.setItem('userData', newUserInfo)
        this.$router.push({
          name: 'index',
          path: '/enter/',
          params: {
            user: this.userName
          }
        })
      }).catch(res => {
        console.log(res)
      })
    },
    open () {
      this.$message('请联系管理员')
    }
  }
}
</script>

<style lang="less" scoped>
    .border-radius(@radius){
        border-radius: @radius;
    }
    .el-container{
        background: linear-gradient(to right,#5de5bd,#05bed3);
    }
    .el-main{
        background: url('../../static/images/login_bg.png');
        background-size: cover;
        height:100vh;
        position: relative;
        .el-row{
            height: 100%;
        }
    }
    .grid-content{
        background-color:#fff;
        .border-radius(2px);
        padding: 40px 50px;
        min-width: 310px;
        h2{
            font-size: 30px;
            color:#353535;
            text-align: center;
            line-height: 150px;
        }
        .form-item{
            margin-bottom:25px;
        }
        .forget-password{
            font-size: 14px;
            color:#bdbdbd;
            line-height: 60px;
            text-align: right;
            cursor: pointer;
        }
        .userName{
            background: url('../../static/images/user.png') no-repeat right center;
            background-size:100%;
        }
        .password{
            background: url('../../static/images/password.png') no-repeat left center;
            background-size:100%;
        }
    }
</style>
