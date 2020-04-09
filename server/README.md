# 初始化server(即初始化一个node项目)
```
$cd server
$npm init -y
```

# 全局安装以下组件
```
$sudo npm i -g nodemon
```

# 项目内安装以下组件
```
$npm i express@next
$npm i mongoose
$npm i cors
$npm i inflection
$npm i multer
$npm i bcrypt
$npm i jsonwebtoken
$npm i http-assert
$npm i require-all  >把所有模型引用一遍，避免报错

```

# 初始化mongodb数据库adminuser表

```
$mongo
```

# 添加mongodb管理员
```
>use admin
>db.createUser({user:"admin",pwd:"567567",roles: [{ role: "root", db: "admin" }]})
```
# 添加数据库用户
```
>use mevn-kingglory
>db.createUser({user: "kingglory", pwd: "567567", roles: [{ role: "dbOwner", db: "mevn-kingglory" }]})
```
# 初始化mevn-kingglory的adminusers表
```
>use mevn-kingglory
>db.adminusers.insert(
  {
    username: "admin",
    fullname: "管理员",
    password: "$2b$10$dDWU3yXTyZ31N7qowCWlougFcgCJqc9HVhNBwFykCWpJ5qTRYD.eS"
  });
```