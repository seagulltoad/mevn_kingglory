<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="所属分类">
        <el-select
          v-model="model.categories"
          multiple
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="文章内容">
        <vue-editor
          v-model="model.content"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
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
import { VueEditor } from "vue2-editor";

export default {
  // props用于接收参数
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    // 自定义富文本中的图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },

    // 新建和编辑保存
    async save() {
      //console.log('save');
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 需要请求一个接口，提交数据
        res = await this.$http.post("rest/articles", this.model);
      }

      // 提交数据后，路由到显示列表
      this.$router.push("/articles/list");
      // 并提示保存成功
      this.$message({
        type: "success",
        message: "保存成功" + res.data
      });
    },

    // 取回数据
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    // 表示如果id值存在，就执行 &&后面的语句
    this.id && this.fetch();
  }
};
</script>