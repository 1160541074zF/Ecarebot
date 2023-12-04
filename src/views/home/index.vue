<template>
  <div class="container">
    <img :src="src1" class="responsive-image">
  </div>

</template>

<script>
export default{
  data(){
    return {
      src1: require('@/assets/home/image1.png'),
      // src2: require('@/assets/home/image2.png'),
      // src3: require('@/assets/home/image3.png')
    }
  }
}

</script>

<style>
.container {
  width:1600px;
  /* 设置容器宽度，根据需要进行调整 */
  max-width: 100%;
  /* 居中显示 */
  margin: 0 auto;
}

.responsive-image {
  width:1600px;
  /* 使图片宽度自适应容器 */
  max-width: 100%;
  /* 高度自动调整，保持原始图片比例 */
  height: auto;
}
</style>