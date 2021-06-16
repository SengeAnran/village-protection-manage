<template>
  <div class="notFound-wrp pt-36">
    <img class="img" :src="require('@/assets/imgs/404.png')" alt="" />
    <p class="desc -mt-20 mb-16">哎呀页面丢失了！</p>
    <router-link to="/" class="btn">回到首页</router-link>
  </div>
</template>
<style lang="scss" scoped>
.notFound-wrp {
  .img {
    margin: 0 auto;
    width: 744px;
    height: 502px;
    filter: brightness(1.04);
  }
  .desc {
    text-align: center;
    font-size: 20px;
    color: #7b95db;
    line-height: 28px;
    filter: brightness(0.95);
  }
  .btn {
    cursor: pointer;
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    border: 1px solid #adc3fc;
    font-size: 20px;
    color: #7b95db;
    transition: all 0.3s;
    &:hover {
      border: 1px solid #5e82e0;
      color: #4478f1;
    }
  }
}
</style>
