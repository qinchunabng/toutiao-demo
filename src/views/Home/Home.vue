<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed placeholder/>
    <ArticleInfo v-for="item in articleList" 
      :key="item.art_id" 
      :title="item.title"
      :author="item.aut_name"
      :cmt-count="item.comm_count"
      :time="item.pubdate"
      :cover="item.cover">
    </ArticleInfo>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleApi.js'
import ArticleInfo from '@/components/Aritcle/ArticleInfo.vue'

export default {
  name: 'Home',
  data(){
    return {
      page: 1,
      limit: 10,
      articleList: []
    }
  },
  created(){
    this.initArticleList();
  },
  methods:{
    //获取封装文章列表数据的方法
    async initArticleList(){
      const { data: res } = await getArticleListAPI(this.page, this.limit);
      console.log(res);
      this.articleList = res;
    }
  },
  components:{
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-bottom: 50px;
  /deep/ .van-nav-bar{
    background-color: #007bff;
  }
  /deep/ .van-nav-bar__title{
    color: white;
  }
}
</style>