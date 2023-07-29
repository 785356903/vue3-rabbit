/** @format */

// 封装购物车模块

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore(
  'cart',
  () => {
    //1. 定义state - cartList
    const cartList = ref([]);
    //2. 定义action - addCart
    const addCart = goods => {
      // 添加购物车操作
      //已添加过-count+1
      //没有添加过-直接push
      //思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find(v => v.skuId == goods.skuId);
      if (item) {
        item.count++;
      } else {
        cartList.value.push(goods);
      }
      console.log(cartList.value);
    };
    // 删除购物车
    const delCart = skuId => {
      // 思路:
      // 1.找出要删除的下角标 - splice
      // 2.过滤方法筛 - filter
      cartList.value = cartList.value.filter(v => v.skuId != skuId);

      // const index = cartList.value.findIndex(v => v.skuId == skuId);
      // cartList.value.splice(index,1)
    };
    return { cartList, addCart, delCart };
  },
  {
    persist: true, //可以自定义配置存储的地方，这是默认储存
  }
);
