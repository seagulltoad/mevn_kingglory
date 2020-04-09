<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/4c6f865f3ec17d0ae57cde4ee9160c1f.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/8309d2ad39a5a51bd6c2d60cdc2169ff.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/817092a480ae682449b66dc641aec573.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div>故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-store"></i>
          <div>周边商城站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-service"></i>
          <div>体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-freshman"></i>
          <div>新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-inherit"></i>
          <div>荣耀传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-fan"></i>
          <div>同人社区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-campus"></i>
          <div>王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-officalaccount"></i>
          <div>公众号</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-version"></i>
          <div>本版介绍</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons-->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 d-flex text-dark">{{news.title}}</span>
          <span>{{news.createdAt}}</span>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="cc-menu-circle" title="英雄列表" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2  fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="cc-menu-circle" title="精彩视频" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2  fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-list-card icon="cc-menu-circle" title="图文攻略" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2  fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        }
      },
      // 分类数据
      newsCats: []
    };
  },

  // 
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    }
  },
  //
  created() {
    this.fetchNewsCats();
  },
//
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  //
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1; // 表示不需要透明
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      // 最右边的不显示边框
      border-left: none;
    }
  }
}
</style>
