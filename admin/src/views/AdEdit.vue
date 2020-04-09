<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="text"
          @click="model.items.push({})"
        ><i class="el-icon-plus"></i>添加广告</el-button>
        <el-row
          type="flex"
          style="flex-wrap: wrap"
        >
          <el-col
            :md="24"
            v-for="(item,i) in model.items"
            :key="i"
          >
          <el-form-item label="标题">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 0.5rem;">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers ="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
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
                size="small"
                type="danger"
                @click="model.items.splice(i,1)"
              >删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: []
      }
    };
  },
  methods: {
    // 新建和编辑保存
    async save() {
      //console.log('save');
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 需要请求一个接口，提交数据
        res = await this.$http.post("rest/ads", this.model);
      }

      // 提交数据后，路由到显示列表
      this.$router.push("/ads/list");
      // 并提示保存成功
      this.$message({
        type: "success",
        message: "保存成功" + res.data
      });
    },

    // 取回数据
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    // 表示如果id值存在，就执行 &&后面的语句
    this.id && this.fetch();
  }
};
</script>