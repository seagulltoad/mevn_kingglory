
<template>
  <div class="login-container">
    <el-card
      header="请先登录"
      class="login-card"
    >
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="model.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
          >登录</el-button>          
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login(){
      
      const res = await this.$http.post('login', this.model)
      //console.log(res.data)
      // 登录后把token保存起来
      // 方式1： localStorage 浏览器关闭后重新打开，仍然有。
      localStorage.token = res.data.token
      // 方式2： sessionStorage 浏览器关闭后，不再保存，没有了。
      //sessionStorage.token = res.data.token
      // 跳转到根路径
      this.$router.push('/')
      // 弹出提示消息
      this.$message({
        type: 'success',
        message: '登录成功！'
      })
    }
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>