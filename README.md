
# server
mkdir server

cd server
npm init --yes

# admin
vue create admin
默认选项

# web
vue create web
默认选项

# 生产环境编译
npm run build

安装serve
$npm install -g serve
启动dist
serve dist

---

# 基于node.js+vue.js(Express + Element-UI)全栈开发客户前端网站和管理后端

参考：https://github.com/topfullstack/node-vue-moba

视频：https://www.bilibili.com/video/av51931842

## 一、入门
1.项目介绍
2.工具安装和环境搭建(node.js,npm,mysql或mongodb)
3.初始化项目

## 二、管理后台
1.基于Element-UI的后台管理基础界面搭建
2.创建分类（多层级）
3.分类列表
4.修改分类
5.删除分类
子分类

**通过用CRUD接口**
任何一个资源，必须有一个对应的模型存在。放在/models/下。模型不能做通用。
$npm install inflection  // 专门处理单复数的转换，如下划线等，单词的格式转换



装备管理
7.图片上传和文件管理（multer）
$npm install multer  //上传文件的中间件

英雄管理
编辑英雄
装备的多选(el-select, multiple)
技能的编辑

文章管理
富文本编辑器(quill)[https://quilljs.com/]
管理员账号管理(bcrypt)
登录页面
登录接口(jwt, jsonwebtoken)
服务端登录校验
客户端路由限制(beforeEach, meta)
上传文件的登录校验(el-upload, headers)

## 三、客户前端网站
1.工具样式概念和SASS(SCSS)
scss支持嵌套语法

2.样式重置
全局

3.网站色彩和字体定义(colors, text)

## vscode 安装 px to rem插件,光标位置处，按alt+z进行px和rem转换

4.通用flex布局样式定义(flex)


5.常用边距定义(margin, padding)
margin 外边距, 
padding 内边距

1.开发服务端接口
2.考虑整体样式
3.使用字体图标(iconfont)
www.iconfont.cn

4.首页顶部轮播图片(vue swiper)
在线例子:
https://github.surmon.me/vue-awesome-swiper/

$npm i swiper vue-awesome-swiper --save

使用精灵图片(sprite)
www.spritecow.com

5.考虑通用组件(SFC，Single File Components，vue单文件组件)
6.卡片组件(card)

列表卡片组件(list-card, nav, swiper)

7.菜单组件(tab+swiper)
8.首页新闻资讯-后台数据录入编辑
通过chrome的开发者工具的console
$$('.news_list .title').map(el=>el.innerHTML)

首页新闻资讯-数据接口
首页新闻资讯-界面展示

9.新闻详情页
10.首页英雄列表
11.英雄详情页

## 四、发布和部署（阿里云）
1.生产环境编译
npm run build # 编译成生产环境

$npm install -g serve

启动dist
serve dist
默认访问：
http://localhost:5000


2.购买域名和服务器
3.域名解析
4.Nginx安装和配置
5.Mysql或MongoDB数据库的安装和配置
6.git安装、配置ssh-key
7.node.js安装、配置淘宝镜像
8.拉取代码，安装pm2并启动项目[PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。]
9.配置Nginx的反向代理
10.迁移本地数据到服务器(mongodump)

## 五、改进
1.使用免费SSL证书启用HTTPS安全链接
2.使用阿里云OSS云存储存放上传文件

##
nodejs 10+

npm的镜像替换为淘宝镜像

npm get registry
->https://registry.npmjs.org/

npm config set registry http://registry.npm.taobao.org/

yarn config set registry http://registry.npm.taobao.org/

换成原来的镜像
npm config set registry https://registry.npmjs.org/

yarn config set registry https://registry.npmjs.org/

全局安装@vue/cli
sudo npm install -g @vue/cli

# 搭建步骤

## server
创建server服务端，为web和admin端提供接口

$mkdir server
初始化server(即，初始化一个node项目)
$cd server
$npm init -y

package.json配置文件
增加启动脚本：
  "scripts": {
    "serve": "nodemon index.js",

index.js为入口文件，需要手工创建

全局安装nodemon
$sudo npm i -g nodemon

## 在server项目里，安装常用的模块: express@next , mongoose, cors
## Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具
## cors 允许跨域请求的
$npm install express@next mongoose

$npm install inflection  // 专门处理单复数的转换，如下划线等，单词的格式转换

$npm install multer // 专门处理文件上传中间件

启动server项目
npm run serve

给所有的用户密码进行散列加密，不可逆。
$npm install bcrypt

使用jsonwebtoken
$npm install jsonwebtoken

使用http-assert
$npm install http-assert


## admin
$vue create admin

在admin中安装element ui插件
$cd admin
$vue add element
所有默认设置，回车即可。

在admin中安装router路由插件
$vue add router
以下为选项设置，
Use history mode for router? N

// vue/cli 4.3里router配置文件为src/outer/index.js

App.vue去掉边距
<style>
html,body{
  margin: 0;
  padding: 0;
}
</style>

让容器充满屏幕：
<el-container style="height: 100vh;">

<router-view></router-view> 路由容器,用于在Main中显示路由来的页面
<el-form @submit.native.prevent="save"> native表示原生表单，prevent表示阻止默认提交，不要跳转页面。

<template  slot-scope="scope">  
        <el-button type="primary" size="small" 
        @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>  路径带参数时候必须有反向单引号``
</template>

 parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},  数据模型中的父类ID使用: mongoose.SchemaTypes.ObjectId, ref: 为关联的模型

通过axios，请求接口
在项目admin中安装axios
$npm install axios

建议每个接口，写一个js。

首先，写一个http.js封装axios

Vue.set()和this.$set()区别：
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')，你会发现vue官网是vue.set

Vue.set()向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')
Vue.set()和this.$set()这两个api的实现原理基本一模一样，都是使用了set函数。set函数是从 ../observer/index 文件中导出的，区别在于Vue.set()是将set函数绑定在Vue构造函数上，this.$set()是将set函数绑定在Vue原型上。

在admin中安装富文本插件
$npm install --save vue2-editor




## web
$vue create web
默认配置即可

使用scss样式,安装sass
$npm install -D sass sass-loader





## ##############################
## Node+Express+vue+mongodb/mysql/oracle/posgresql
## 
## server端：提供api服务，连接mysql
## admin端：管理后台，通过api调用访问server
## web端：客户前端，通过api调用访问server
## ##############################

基本要求：
nodejs 10+
npm
yarn

安装基础环境:
1.安装node后，自动安装了npm.
2.安装yarn
3.安装@vue/cli
sudo npm install -g @vue/cli


npm get registry
->https://registry.npmjs.org/

npm config set registry http://registry.npm.taobao.org/
yarn config set registry http://registry.npm.taobao.org/

## 以下为搭建步骤

## 创建myproject工作目录
$mkdir myproject
$cd myproject

## 搭建server
$mkdir server
$cd server
$npm init -y  // 初始化node项目server

$sudo npm install -g nodemon // 全局安装nodemon
$npm install express@next -S // 安装express
$npm install mongoose -S  //安装mongodb连接模块

$npm install mysql -S  // 安装mysql连接模块
$npm install oracledb -S // 安装oracle连接模块
$npm install pg -S // 安装postgresql连接模块
$npm install redis -S //安装redis连接组模块
$npm install mssql -S // 安装sqlserver连接模块

## node+express连接各数据库代码模块

### 1. mongoose
https://www.npmjs.com/package/mongoose

//Importing
// Using Node.js `require()`
const mongoose = require('mongoose');
 
// Using ES6 imports
import mongoose from 'mongoose';

//Connecting to MongoDB 
await mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Defining a Model
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});

const Comment = new Schema({
  name: { type: String, default: 'hahaha' },
  age: { type: Number, min: 18, index: true },
  bio: { type: String, match: /[a-z]/ },
  date: { type: Date, default: Date.now },
  buff: Buffer
});
 
// a setter
Comment.path('name').set(function (v) {
  return capitalize(v);
});
 
// middleware
Comment.pre('save', function (next) {
  notify(this.get('email'));
  next();
});

// Accessing a Model
const MyModel = mongoose.model('ModelName');
或者
const MyModel = mongoose.model('ModelName', mySchema);

const instance = new MyModel();
instance.my.key = 'hello';
instance.save(function (err) {
  //
});

MyModel.find({}, function (err, docs) {
  // docs.forEach
});

const instance = await MyModel.findOne({ ... });
console.log(instance.my.key);  // 'hello'

const conn = mongoose.createConnection('your connection string');
const MyModel = conn.model('ModelName', schema);
const m = new MyModel;
m.save(); // works

const conn = mongoose.createConnection('your connection string');
const MyModel = mongoose.model('ModelName', schema);
const m = new MyModel;
m.save(); // does not work b/c the default connection object was never connected

// retrieve my model
const BlogPost = mongoose.model('BlogPost');
 
// create a blog post
const post = new BlogPost();
 
// create a comment
post.comments.push({ title: 'My comment' });
 
post.save(function (err) {
  if (!err) console.log('Success!');
});

BlogPost.findById(myId, function (err, post) {
  if (!err) {
    post.comments[0].remove();
    post.save(function (err) {
      // do something
    });
  }
});

### 2. mysql
https://www.npmjs.com/package/mysql

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();

### 3. oracle
https://www.npmjs.com/package/oracledb

//导入oracledb模块 
//基于版本@3.0.1  安装指令npm install oracledb
//node访问oracleDB需要搭建访问环境，否则无法正常访问

//创建Oracle对象
let oracledb  = null;
//引用配置参数模块
let configFile = require("./config");
//引用通用方法模块
let common = require("./commonHelper");

try{
  oracledb = require('oracledb');
}
catch (err) {
  console.log("oracledb声明错误原因："+ err.message);
}

//默认config对象
let config=configFile.oracle_config;
let oracle={};

//配置存储过程是的输出输入,与参数类型
oracle.db=oracledb;

let connection = null;
async function initConnection(){
  if(connection == null){
    connection = await oracledb.getConnection(config);//配置默认连接池,配置过就无需再继续配置
  }
}

(async ()=>{
  //是否初始化数据库连接
  if(configFile.init_oracle){
    await initConnection();
  }
})();

/**
 * 初始化连接参数
 * @param {string} user 用户名
 * @param {string} password 密码
 * @param {string} connectString 数据库连接字符串
 */
oracle.initConfig=function(user,password,connectString){
  config.user=user;
  config.password=password;
  config.connectString=connectString;
  connection = null;
}

//统计行号
let rowCount = 0;
/**
 * 执行sql文本(带params参数),由于要使用逐条读取所以只能通过回调返回数据
 * @param {string} sqlText 执行的sql语句
 * @param {JSON} params sql语句中的参数
 * @param {JSON} isToJson 每行都被提取为JavaScript对象
 * @param {function} func 回调函数 逐行读取数据返回
 */
oracle.queryWithParams= async function(sqlText,params,isToJson,func){
    try {
        let options = {resultSet: true, outFormat: oracledb.ARRAY};
        if (isToJson) {
            options = {resultSet: true, outFormat: oracledb.OBJECT};
        }
        //获取连接池内的连接
        oracledb.getConnection(config,
            function (err, connection) {
                //判断是否存在异常信息，是释放数据库连接与返回错误信息
                if (executeErr(err,connection,func)) {
                    return;
                }
                connection.execute(sqlText, params, options, async function (err, result) {
                    //判断是否存在异常信息，是释放数据库连接与返回错误信息
                    if (executeErr(err,connection,func)) {
                        return;
                    }
                    rowCount = 0;//初始化统计行号
                    fetchOneRowFromRS(connection, result.resultSet, func);
                })
            });
    }
    catch (err) {
        console.log(err)
        return {state:false,data:err.message};//返回错误信息
    }
};
//递归读取结果集的数据
function fetchOneRowFromRS(connection, resultSet,func) {
    resultSet.getRow( // get one row
        async function (err, row) {
            if (err) {
                console.error(err.message);
                await doClose(connection, resultSet); // 发生异常错误的时候关闭数据库连接
            } else if (!row) {               // 无数据的时候，关闭数据库连接
                await doClose(connection, resultSet);
            } else {
                rowCount++;
                common.consoleLog ("fetchOneRowFromRS(): row " + rowCount);
                common.consoleLog (row);
                func({state:true,data:row});//返回行数据
                fetchOneRowFromRS(connection, resultSet,func);
            }
        }
    );
}

/**
 * 执行sql文本(带params参数)
 * @param {string} sqlText 执行的sql语句
 * @param {JSON} params sql语句中的参数
 * @param {JSON} isToJson 每行都被提取为JavaScript对象
 */
oracle.queryByParams=async function(sqlText,params,isToJson){
    try {
        let options = { outFormat: oracledb.ARRAY };
        if(isToJson)
        {
            options ={outFormat: oracledb.OBJECT };
        }
        await initConnection();//初始化连接
        let result = await connection.execute(sqlText,params,options);
        return {state:true,data:result};//返回查询的结果数据
    }
    catch (err) {
        await doReconnection(err.message,sqlText);
        return {state:false,data:err.message};//返回错误信息
    }
};


/**
 * 执行存储过程文本(带params参数)
 * @param {string} sqlText 执行的存储过程
 * @param {JSON} params sql语句中的参数
 * let params = {
       p1:  'Chris', // Bind type is determined from the data.  Default direction is BIND_IN
       p2:  'Jones',
       ret:  { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 }
    };
 * 查询结果的常量outFormat选项oracledb.ARRAY    4001    将每行作为列值数组获取，oracledb.OBJECT    4002    将每行作为对象获取
 */
oracle.executePro=async function(sqlText,params){
    try {
        await initConnection();//初始化连接
        let result = await connection.execute(sqlText,params,{outFormat: oracledb.ARRAY });
        return {state:true,data:result};//返回存储过程执行结果数据
    }catch (err) {
        await doReconnection(err.message,sqlText);
        return {state:false,data:err.message};//返回错误信息
    }
};

/**
 * 执行一条数据插入，修改，删除，存储过程文本(带params参数)
 * @param {string} sqlText 执行的存储过程
 * "INSERT INTO test VALUES (:id, :nm)",
 * @param {JSON} params sql语句中的参数
 * 写法一：{ id : {val: 1 }, nm : {val: 'Chris'} }
 * 写法二：[1, 'Chris']
 */
oracle.execute=async function(sqlText,params){
    try {
        await initConnection();//初始化连接
        let result = await connection.execute(sqlText,params,{ autoCommit: true});
        return {state:true,data:result};//返回执行结果数据
    }catch (err) {
        await doReconnection(err.message,sqlText);
        return {state:false,data:err.message};//返回错误信息
    }
};


/**
 * 执行多条数据插入，修改，删除，存储过程，文本(带params参数)
 * @param {string} sqlText 执行的存储过程
 * let sql = "INSERT INTO em_tab VALUES (:a, :b)";
 * @param {JSON} params sql语句中的参数
 * 写法一：let params = [
 { a: 1, b: "Test 1 (One)" },
 { a: 2, b: "Test 2 (Two)" },
 { a: 3, b: "Test 3 (Three)" },
 { a: 4 },
 { a: 5, b: "Test 5 (Five)" }
 ];
 * 写法二：let params = [
 [1, "Test 1 (One)"],
 [2, "Test 2 (Two)"],
 [3, "Test 3 (Three)"],
 [4, null],
 [5, "Test 5 (Five)"]
 ];
 * @param {JSON} options sql语句中的参数
 * 写法一： let options = {
    autoCommit: true,//必须有这个自动提交参数
    bindDefs:
    [ { type: oracledb.NUMBER },
      { type: oracledb.STRING, maxSize: 15 }
    ] };
 写法二：
 let options = {
    autoCommit: true,//必须有这个自动提交参数
    bindDefs: {
      a: { type: oracledb.NUMBER },
      b: { type: oracledb.STRING, maxSize: 15 }
    } };
 */
oracle.executeMany=async function(sqlText,params, options){
    options = Object.assign({},options,{autoCommit: true});//默认配置执行语句自动提交
    try {
        await initConnection();//初始化连接
        let result = await connection.executeMany(sqlText,params,options);
        return {state:true,data:result};//返回执行结果数据
    }catch (err) {
        await doReconnection(err.message,sqlText);
        return {state:false,data:err.message};//返回错误信息
    }
};

//执行SQL语句错误回调函数释放数据库连接
function executeErr(err,connection,func) {
    if (err) {
        console.error(err.message);
        doRelease_async(connection);//释放数据库连接
        func({state:false,data:err.message});//返回错误信息
        return true;
    }
    return false;
}
//关闭当前数据库连接
oracle.doClose =async function () {
    if(connection)
    {
        try {
            await connection.close();
        }
        catch (err) {
            console.error(err.message);
        }
    }
}

//关闭数据库连接
function doRelease_async(connection) {
    if(connection)
    {
        connection.close(
            function(err) {
                if (err) { console.error(err.message); }
            });
    }
}

//重新连接数据库
async function doReconnection(message,sqlText) {
    let time=new Date().Format("HH:mm:ss");
    common.writeLog("oracle_connection",time  + common.partition +sqlText+ common.partition + message);
    console.log(message);
    //释放连接，重新连接oracle
    if(message.search("not connected to ORACLE")>=0 || message.search("invalid connection")>=0 || message.search("未连接到 ORACLE") >=0 )
    {
        connection = null;//重新初始化oracle连接
    }
}

//关闭结果集在关闭数据库连接
async function doClose(connection, resultSet) {
    try {
        if(resultSet)
        {
            await resultSet.close();//释放读取流
        }
        if(connection)
        {
            await connection.close();//释放连接，将连接放回池中
        }
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports=oracle;

### 4. postgresql
https://www.npmjs.com/package/postgresql

1.安装pg
cnpm install pg -g
2.连接pg
// 使用连接池的方式:
var pgsql = require('pg');
var connection = pgsql.Pool({
host : 'localhost',
port : 5432,
user : 'postgres',
password : 'admin',
database : 'ben'
});
connection.connection();
var sql=" SELECT * from weather";
connection.query(sql, function (err, results, fields) {
if(err){
console.log(err.message);
return;
}
console.log('--------------------------SELECT----------------------------');
console.log(results);
console.log('------------------------------------------------------------\n\n');
});

// 连接客户端:
const pg=require('pg')
var conString = "postgres://username:password@localhost:port/databaseName";
var client = new pg.Client(conString);
client.connect(function(err) {
if(err) {
return console.error('连接postgreSQL数据库失败', err); //先判断连接是否成功，失败直接跳出
}
client.query('SELECT * FROM tableName', function(err, data) {
if(err) {
return console.error('查询失败', err);
}else{
// console.log('成功',data.rows);
console.log('成功',JSON.stringify(data.rows));
}
client.end();
});
});

// 数据库操作
// 查询
var sql=" SELECT * from weather";
connection.query(sql, function (err, results, fields) {
if(err){
console.log(err.message);
return;
}
console.log('--------------------------SELECT----------------------------');
console.log(results);
console.log('------------------------------------------------------------\n\n');
});

// 插入数据
var addSql = 'INSERT INTO weather(city,temp_lo,temp_hi,prcp,date) VALUES( $1,$2,$3,$4,$5)';
//注意：必须是$1,$2,$3,$4,$5
var addSqlParams = ['nodejs',12,23,0.32,'2019-2-27'];
connection.query(addSql,addSqlParams,function (err, result) {
if(err){
console.log(err);
return;
}
console.log('--------------------------INSERT----------------------------');
//console.log('INSERT ID:',result.insertId);
console.log('INSERT ID:',result);
console.log('-----------------------------------------------------------------\n\n');
});

// 更新
var addSql = 'UPDATE weather SET temp_hi = temp_hi - 2, temp_lo = temp_lo - 2 WHERE date > 1,3,5`
var addSqlParams = ['1994-11-28'];
connection.query(addSql,addSqlParams,function (err, result) {
if(err){
console.log(err);
return;
}
//console.log('INSERT ID:',result.insertId);
console.log(result);
console.log('-----------------------------------------------------------------\n\n');
});

// 删除
var addSql = 'DELETE FROM weather WHERE city=1,3,5`
var addSqlParams = ['ben'];
connection.query(addSql,addSqlParams,function (err, result) {
if(err){
    console.log(err);
    return;
    }        
   //console.log('INSERT ID:',result.insertId);        
   console.log(result);        
   console.log('-----------------------------------------------------------------\n\n');  
});

### 5. redis
https://www.npmjs.com/package/redis

const redis = require("redis");
const client = redis.createClient();
 
client.on("error", function(error) {
  console.error(error);
});
 
client.set("key", "value", redis.print);
client.get("key", redis.print);

// Promises
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
 
getAsync.then(console.log).catch(console.error);

### 6. sqlserver
https://www.npmjs.com/package/mssql

1、安装 mssql
依据官方代码进行封装，可以使用ES6模板，下面是官方代码:
const sql = require('mssql')

sql.connect(config).then(() => {
    return sql.query`select * from mytable where id = ${value}`
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})

sql.on('error', err => {
    // ... error handler
})

2、添加 database.config.js
// 配置
var config = {
   server: "127.0.0.1",
    database: "test",
    user: "sa",
    password: "root",
    port: 1433
}
module.exports = config;

3、添加 db.js
注意：每次请求后需要关闭连接
// 配置文件
var config = require('./db.config.js');
var sql = require('mssql');

var db = (sqlstr, callback) => {
    sql.connect(config).then(function () {
        return sql.query(sqlstr)
    }).then(result => {
        callback(result);
        sql.close();
    }).catch(error => {
        sql.close();
    })
}
module.exports = db;

4、app.js
var express = require('express');
var app = express();
var db = require('./db.js');

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})

var server = app.listen(8080);

app.get('/users', (req, res) => {
    var sql = "SELECT TOP 10  from user  ORDER BY id DESC";
    db(sql, result => {
        console.log(result);
        res.send(result);
    })
})


## 搭建admin
$cd myproject
$vue create admin
$cd admin

$vue add element //所有默认设置，回车即可。
// 在admin中安装router路由插件
$vue add router
// 以下为选项设置，
//Use history mode for router? N
// 安装axios
$npm install axios

## 搭建web
$cd myproject
$vue create web

