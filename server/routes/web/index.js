// 由web应用调用的前端路由
module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  // const Article = require('../../models/Article')
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");

  // 初始化新闻资讯的标题
  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻资讯",
    });

    const cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean();

    const newsTitles = [
      "新皮肤爆料丨拔刀斩恶魂！橘右京新装登场~",
      "豪横！王者荣耀英雄主打歌完整歌单霸气登陆酷狗！",
      "蔡文姬繁星吟游皮肤，史诗升级进行时！",
      "冷艳御姐是如何练成的？参与「镜」主题创作赢荣耀水晶",
      "廉颇重塑计划爆料",
      "4月5日开服及奖励通知",
      "4月8日净化游戏环境声明及处罚公告",
      "4月8日“演员”惩罚名单",
      "4月8日体验服停机更新公告",
      "4月8日全服不停机更新公告",
      "橘右京全新史诗皮肤上架 SNK皮肤齐聚峡谷福利大放送",
      "【预告】荣耀中国节·轻风戏纸鸢，参与必得纸鸢回城特效（永久）",
      "参与“S19战令集结号”，赢80级直升经验大礼",
      "【镜界诞生 见证觉醒】活动公告",
      "S19赛季来临 多重好礼邀你开启全新赛季",
      "为战队争夺荣誉！城市联赛战队赛通道报名开启！",
      "高校联赛分站赛即将打响 今年又有多少好玩的活动值得期待？",
      "《一招即浪》第一期：白起强势归来，教你如何化身“边路杀神”",
      "KPL王者荣耀职业联赛4月4日比赛停赛公告",
      "《王者荣耀》城市赛选手看过来！新版本“玄雍危机”热门英雄玩法盘点",
    ];

    const newsList = newsTitles.map((title) => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      };
    });

    await Article.deleteMany({}); // 传递空对象，表示清空

    await Article.insertMany(newsList); // 插入数据

    res.send(newsList);
  });

  // 新闻接口
  // 1.将新闻资讯展示出来，用于前端调用
  router.get("/news/list", async (req, res) => {
    // const parent = await Category.findOne({
    //   name: "新闻资讯",
    // }).populate({
    //   path: "children",
    //   populate: {
    //     path: "newsList",
    //   },
    // }).lean();

    const parent = await Category.findOne({
      name: "新闻资讯",
    });
    // 使用聚合查询
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } }, // 相当于where
      {
        $lookup: {
          // 相当于join in
          from: "articles", // 关联哪个表，即哪个集合.集合名称
          localField: "_id", //本地键
          foreignField: "categories", //外地键
          as: "newsList", // 起个名字
        },
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }, // 表示每个newsList只取5个元素
        },
      },
    ]);

    const subCats = cats.map((v) => v._id);

    // 查询热门,即不限制分类，取的整的数据
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats },
        })
        .populate("categories")
        .limit(5)
        .lean(),
    });

    // 处理一下热门里的分类显示
    cats.map((cat) => {
      cat.newsList.map((news) => {
        news.categoryName =
          cat.name === "热门" ? news.categories[0].name : cat.name;
        return news;
      });
      return cat;
    });

    res.send(cats);
  });

  app.use("/web/api", router);
};
