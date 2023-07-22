<!-- @format -->
<script setup>
defineProps({
  good: {
    type: Object,
    default: () => {},
  },
});
</script>
<template>
  <li>
    <RouterLink to="/" class="goods-item">
      <img v-img-lazy="good.picture" alt="" />
      <p class="name ellipsis">{{ good.name }}</p>
      <p class="desc ellipsis">{{ good.desc }}</p>
      <p class="price">&yen;{{ good.price }}</p>
    </RouterLink>
  </li>
</template>

<style lang="scss" scoped>
li {
  width: 240px;
  height: 300px;
  margin-right: 10px;
  margin-bottom: 10px;
  list-style: none;

  &:nth-last-child(-n + 4) {
    margin-bottom: 0;
  }

  &:nth-child(4n) {
    margin-right: 0;
  }
}
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
