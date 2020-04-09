// 定义一个数据模型
const mongoose  = require("mongoose")

const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String}, // 只保存头像的图片地址
    title: {type: String},
    //category: {type: mongoose.SchemaTypes.ObjectId,ref:'Category'}, // 表示一个分类
    categories: [{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}], // 表示多个分类
    scores: {
        difficult: {type: Number},
        skills: {type: Number},
        attack: {type: Number},
        survive: {type: Number},
    },
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String}, 
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],

    usageTips: {type: String},
    battleTips: {type: String},
    teamTips: {type: String},

    partners: [{
        hero:{type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String},
    }]

})

module.exports = mongoose.model('Hero', schema)