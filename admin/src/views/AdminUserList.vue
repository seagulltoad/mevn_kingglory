<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column
        prop="_id"
        label="ID"
        width="230"
      >
      </el-table-column>

      <el-table-column
        prop="username"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="fullname"
        label="全名"
      >
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="头像"
      >
       <template slot-scope="scope">
          <img
            :src="scope.row.avatar"
            style="height:3rem;"
          >
        </template>
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
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
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
    // 获取初始化数据
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
    },
    // 删除行
    async remove(row) {
      this.$confirm(`是否确定要删除管理员"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 选择确定删除的时候，请求接口
          const res = await this.$http.delete(`rest/admin_users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!" + res.data
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
