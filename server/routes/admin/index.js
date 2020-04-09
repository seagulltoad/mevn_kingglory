// 由admin应用调用的路由
module.exports = app => {

   const express = require('express')
   const jwt = require('jsonwebtoken')
   const assert = require('http-assert')
   const AdminUser = require('../../models/AdminUser')

   const router = express.Router({
      // 合并url参数
      mergeParams: true
   })

   // === 资源路由 ===
   // 创建资源
   router.post('/', async (req, res) => {
      const model = await req.Model.create(req.body)
      res.send(model)
   })

   // 更新资源
   router.put('/:id', async (req, res) => {
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
   })

   // 获取资源
   router.get('/', async (req, res) => {   
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
         queryOptions.populate = 'parent'
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(100)
      res.send(items)
   })

   // 通过ID获取资源
   router.get('/:id', async (req, res) => {
      const model = await req.Model.findById(req.params.id)
      res.send(model)
   })

   // 通过ID删除资源
   router.delete('/:id', async (req, res) => {
      await req.Model.findByIdAndDelete(req.params.id, req.body)
      res.send({
         success: true
      })
   })

   // 获取用户登录的中间件
   const authMiddleware = require('../../middleware/auth')
   // 获取模型的中间件
    const resourceMiddleware = require('../../middleware/resource')
   // authMiddleware(), 
   app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

   // === 上传文件路由 === 
   const multer = require('multer')
   const upload = multer({ dest: __dirname + '/../../uploads' })
   app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
      //
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
   })

   // === 登录 ===
   app.post('/admin/api/login', async (req, res) => {
      const { username, password } = req.body
      // 1.根据用户名找用户

      const user = await AdminUser.findOne({
         username: username
      }).select('+password')
      // 用户不存在
      assert(user, 422, '用户不存在')
      // 2.校验密码
      const isValid = require('bcrypt').compareSync(password, user.password)
      // 密码错误
      assert(isValid, 422, '密码错误')     
      // 3.返回token
      const token = jwt.sign({ id: user._id }, app.get('secret'))
      res.send({ token })
   })
   // 错误处理函数
   app.use(async (err, req, res, next) => {
      res.status(err.statusCode || 500).send({
         message: err.message
      })
   })
}