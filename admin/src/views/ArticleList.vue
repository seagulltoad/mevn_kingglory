<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column
        prop="_id"
        label="ID"
        width="230"
      >
      </el-table-column>
       <el-table-column
        prop="article.categories"
        label="所属分类"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button
            type="primary"
            size="small"
            @click="remove(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    // 删除行
    async remove(row) {
      this.$confirm(`是否确定要删除文章"${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 选择确定删除的时候，请求接口
          const res = await this.$http.delete(`rest/articles/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"+res.data
          });
          // 刷新表单,获取最新列表
          this.fetch();
        })
        .catch(() => {
            // 取消操作
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
