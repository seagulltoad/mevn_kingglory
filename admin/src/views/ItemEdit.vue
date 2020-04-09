<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers ="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="model.icon"
            :src="model.icon"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    // 表示上传图片后返回
    afterUpload(res){
      // this.model.icon = res.url
      // vue的显示赋值，可以刷新页面
      this.$set(this.model,'icon',res.url)
    },

    // 新建和编辑保存
    async save() {
      //console.log('save');
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // 需要请求一个接口，提交数据
        res = await this.$http.post("rest/items", this.model);
      }

      // 提交数据后，路由到显示列表
      this.$router.push("/items/list");
      // 并提示保存成功
      this.$message({
        type: "success",
        message: "保存成功" + res.data
      });
    },

    // 取回数据
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    // 表示如果id值存在，就执行 &&后面的语句
    this.id && this.fetch();
  }
};
</script>

<style>

</style>