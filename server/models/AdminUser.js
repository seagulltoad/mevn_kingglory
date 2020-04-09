// 定义一个数据模型
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: { type: String },
    fullname: { type: String },
    avatar: {type: String}, // 只保存头像的图片地址
    password: {
        type: String,
        select: false, // 不能被查出来
        set(val) {
            return require('bcrypt').hashSync(val, 10) // 散列加密,只能散列一次
        }
    },
    
})

module.exports = mongoose.model('AdminUser', schema)