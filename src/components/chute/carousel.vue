<template>
  <n-carousel autoplay>
    <img
      class="carousel-img rounded-edges"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img rounded-edges"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img rounded-edges"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img rounded-edges"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>
</template>


<script>
import { NCarousel } from 'naive-ui';
export default {
  components: {
    NCarousel
  }
}
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>