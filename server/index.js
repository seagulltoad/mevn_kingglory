const express = require("express")

const app = express()

// 应该放到环境变量里
app.set('secret','wulalalalong')

// 跨域
app.use(require('cors')())
// json
app.use(express.json())
// 静态文件托管
app.use('/uploads',express.static(__dirname + '/uploads'))
// 引用数据库链接信息
require('./plugins/db')(app)
// 引用admin路由
require('./routes/admin')(app)
// 引用web路由
require('./routes/web')(app)

// 启动服务器并监听3000端口
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});