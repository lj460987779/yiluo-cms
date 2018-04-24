<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/users' }">
          <i class="el-icon-menu"></i> 用户</el-breadcrumb-item>
        <el-breadcrumb-item>更改用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :model="form" label-width="80px" style="margin:0 auto">
      <el-form-item label="姓名" prop="name" :rules="[
              { required: true, message: '请输入用户姓名'}
            ]">
        <el-input v-model="form.name" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" :rules="[
              { required: true, message: '请选择用户性别'}
            ]">
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday" :rules="[
              { required: true, message: '请选择用户生日'}
            ]">
        <el-date-picker type="date" placeholder="选择出生日期" format="yyyy-MM-dd" v-model="form.birthday" style="width: 200px"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :rules="[
              { required: true, message: '请输入用户手机号码'}
            ]">
        <el-input v-model="form.phone" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item label="国家" prop="country" :rules="[
              { required: true, message: '请选择国家'}
            ]">
        <el-select v-model="form.country" placeholder="请选择国家">
          <el-option :label="item[1]" :value="item" :key="item[0]" v-for="item in countries"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <Provience @provinceChanged="provinceChanged" @cityChanged="cityChanged"></Provience>
      </el-form-item>
      <el-form-item label="通讯地址">
        <el-input v-model="form.place" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="证件信息" prop="cardId" :rules="[
              { required: true, message: '请输入用户证件号码'}
            ]">
        <el-select v-model="form.cardType" placeholder="请选择证件类型" class='cardType' style="width: 100px">
          <el-option label="身份证" value="IdCard"></el-option>
          <el-option label="护照" value="passport"></el-option>
          <el-option label="军官证" value="armyCard"></el-option>
          <el-option label="台胞证" value="Taiwan"></el-option>
        </el-select>
        <el-input v-model="form.cardId" class='cardId' style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="邮编">
        <el-input v-model="form.postCode" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="form.education" placeholder="请选择学历" style="width: 200px">
          <el-option label="小学" value="小学"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士及博士以上" value="博士及博士以上"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="form.profesion" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="血型">
        <el-select v-model="form.bloodType" placeholder="请选择血型" style="width: 200px">
          <el-option label="A型" value="IdCard"></el-option>
          <el-option label="B型" value="passport"></el-option>
          <el-option label="AB型" value="armyCard"></el-option>
          <el-option label="O型" value="Taiwan"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参赛经历">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.experience" style="width: 500px">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新信息</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>

    <div>
      <p>参赛记录</p>
      <el-table :data="getMatchResponse" style="width: 100%">
        <el-table-column prop="matchTitle" label="赛事标题" width="180">
        </el-table-column>
        <el-table-column prop="startMatch" label="赛事时间" width="180">
        </el-table-column>
        <el-table-column prop="matchPlace" label="地址">
        </el-table-column>
        <el-table-column prop="rank" label="排名">
        </el-table-column>
        <el-table-column prop="recordId" label="成绩Id">
        </el-table-column>
        <el-table-column prop="matchPrice" label="赛事费用">
        </el-table-column>
        <el-table-column>
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- <el-button size="small" type="danger"
                              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { dateToYMDHMS } from '../../../utils/date.js'
import { updateUser, getUserInfo } from '../../../api/user.js'
const cities = require('../../../../utils/cities.js')
export default {
  data() {
    return {
      form: {
        cardType: ''
      },
      getMatchResponse: [],
      countries: countries
    }
  },
  created() {
    this.userId = this.$route.query.uid;
    this.getInfo(this.userId)
  },
  methods: {
    getInfo(userId) {
      getUserInfo(userId).then(res => {
        this.form = res.data
        this.getMatchResponse = res.data.getMatchResponse
        console.log('获取用户信息：', res.data)
        this.form.gender = 1 ? '男' : '女'
        this.form.cardType = 1 ? '身份证' : 2 ? '护照' : 3 ? '军官证' : '台胞证'
      })
    },
    cityChanged(city) {
      this.form.city = city
    },
    provinceChanged(province) {
      this.form.province = province
    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {

    },
    onSubmit() {
      console.log(this.form)
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        this.form.country = this.form.country ? this.form.country[1] : ''
        if (this.form.birthday) {
          this.form.birthday = dateToYMDHMS(this.form.birthday, 'd')
        }
        let userInfo = JSON.parse(JSON.stringify(this.form))
        userInfo.gender = userInfo.gender === '男' ? 1 : 2
        switch (userInfo.cardType) {
          case "身份证":
            userInfo.cardType = 1;
            break;
          case "护照":
            userInfo.cardType = 2;
            break;
          case "军官证":
            userInfo.cardType = 3;
            break;
          case "台胞证":
            userInfo.cardType = 4;
            break;
        }
        userInfo.userId = this.userId
        updateUser(userInfo).then(res => {
          if (res.success) {
            this.$message.success('更新用户信息成功')
            this.getInfo(this.userId)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error('更新失败')
        })
      })

    }
  }
}
</script>
<style>
.cardType {
  width: 10%;
}

.cardId {
  width: 50%;
}
</style>


