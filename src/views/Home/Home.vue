<template>
  <div class="home-container">
    <van-nav-bar title="标题" fixed placeholder/>
    <van-pull-refresh 
      v-model="isPulling" 
      :disabled="finished"
      @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="我是有底线的~"
        @load="onLoad"
      >
        <ArticleInfo v-for="item in articleList" 
          :key="item.art_id" 
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover">
        </ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleApi.js'
import ArticleInfo from '@/components/Aritcle/ArticleInfo.vue'
//鲁大师 提供了很多函数
import _ from 'lodash'

export default {
  name: 'Home',
  data(){
    return {
      page: 1,
      limit: 10,
      articleList: [],
      //是否正在加载数据
      loading: true,
      //数据是否全部加载完毕
      finished: false,
      //是否下拉加载
      isPulling: false
    }
  },
  created(){
    this.initArticleList();
  },
  activated(){
    window.addEventListener('scroll', this.recordTopHandler())
  },
  deactivated(){
    window.removeEventListener('scroll', this.recordTopHandler())
  },
  methods:{
    //获取封装文章列表数据的方法
    async initArticleList(isRefresh){
      const { data: res } = await getArticleListAPI(this.page, this.limit);
      // debugger
      console.log(res);
      this.loading = false;
      this.isPulling = false;
      //数据为空，数据全部加载完成
      if(res.length===0){
        this.finished = true
        return;
      }
      //拼接数据
      if(isRefresh){
        //下拉刷新
        this.articleList = [ ...res, ...this.articleList];
      }else{
        //上拉加载
        this.articleList = [...this.articleList, ...res];
      }
      
    },
    onLoad(){
      this.loading = true;
      console.log("触发Load事件");
      this.page++;
      this.initArticleList();
    },
    //下拉加载
    onRefresh(){
      console.log('onRefresh...');
      this.isPulling = true;
      this.page++;
      this.initArticleList(true);
    },
    recordTopHandler(){
      return _.debounce(()=>{
        this.$route.meta.top = window.scrollY
      }, 50, { trailing: true })
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
  // /deep/ .van-nav-bar{
    // background-color: #007bff;
  // }
  // /deep/ .van-nav-bar__title{
  //   color: white;
  // }
}
</style>