<template>
  <div class="noAuth-page">
    <img
      class="img"
      :src="require('@/assets/imgs/empty-image-default.png')"
      alt=""
    />
    <span class="desc">暂无访问权限</span>
  </div>
</template>
<style lang="scss" scoped>
.noAuth-page {
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img {
  margin-bottom: 30px;
}
.desc {
  font-size: 20px;
  color: #666;
}
</style>
