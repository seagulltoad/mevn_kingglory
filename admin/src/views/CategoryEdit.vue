<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: {}
    };
  },
  methods: {
    // 新建和编辑保存
    async save() {
      //console.log('save');
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 需要请求一个接口，提交数据
        res = await this.$http.post("rest/categories", this.model);
      }

      // 提交数据后，路由到显示列表
      this.$router.push("/categories/list");
      // 并提示保存成功
      this.$message({
        type: "success",
        message: "保存成功" + res.data
      });
    },

    // 取回数据
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    // 表示如果id值存在，就执行 &&后面的语句
    this.id && this.fetch();
  }
};
</script>