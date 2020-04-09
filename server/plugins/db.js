// 数据库插件
module.exports = app =>{
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://127.0.0.1:27017/mevn-kingglory',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // 把models下所有模型文件引用一遍
    require('require-all')(__dirname + '/../models')
}