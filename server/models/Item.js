// 定义一个数据模型
const mongoose  = require("mongoose")

const schema = new mongoose.Schema({
    name: {type: String},
    icon: {type: String}, // 只保存图片地址
})

module.exports = mongoose.model('Item', schema)