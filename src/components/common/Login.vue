<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from '../../api/auth.js'
    import ls from '../../utils/localStorage.js'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                // this.$store.dispatch('LoginByPhone',this.ruleForm).then(res=>{
                //     this.$message.success('登录成功')
                //     this.$router.push({ path: '/readme' })
                // }).catch(err=>{
                //     this.$message.error('登录失败')
                // })
                const username = this.ruleForm.username;
                const password = this.ruleForm.password;
                login(username,password).then(res=>{
                    if(res.success){
                        this.$message.success('登录成功')
                        ls.setItem('userInfo',res.data)
                        const date = new Date();
                        ls.setItem("login_date",date.getTime())
                        this.$router.push({path:'/readme'})
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    this.$message.error('登录失败')
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>