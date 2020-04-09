<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="全名">
        <el-input v-model="model.fullname"></el-input>
      </el-form-item>
      <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers ="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img
                v-if="model.avatar"
                :src="model.avatar"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
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
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // props用于接收参数
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        username: "",
        fullname:"",
        avatar: "",
      }      
    };
  },
  methods: {
    // 表示上传图片后返回
    afterUpload(res) {
      // 普通赋值方法，适用于：必须在data里预先定义属性
      this.model.avatar = res.url;
      // vue的显示赋值，可以刷新页面，适用于：没有在data里预先定义属性
      //this.$set(this.model,'avatar',res.url)
    },
    // 新建和编辑保存
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        // 需要请求一个接口，提交数据
        res = await this.$http.post("rest/admin_users", this.model);
      }

      // 提交数据后，路由到显示列表
      this.$router.push("/admin_users/list");
      // 并提示保存成功
      this.$message({
        type: "success",
        message: "保存成功" + res.data
      });
    },

    // 取回数据
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    // 表示如果id值存在，就执行 &&后面的语句
    this.id && this.fetch();
  }
};
</script>