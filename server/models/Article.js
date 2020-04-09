// 定义一个数据模型
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }], // 表示多个分类
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", schema);
