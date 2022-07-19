<template>
  <div>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">

</style>