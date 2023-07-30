/** @format */

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { loginAPI } from '@/apis/login.js';
import { mergeCartAPI } from '@/apis/cart.js';
import { useCartStore } from './cartStore';
export const useUserStore = defineStore(
  'login',
  () => {
    const cartStore = useCartStore();
    // 1. 定义管理用户数据的state
    const userInfo = ref({});
    // 2. 定义获取接口数据的action函数
    // 登录
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      // 合并购物车操作
      await mergeCartAPI(
        cartStore.cartList.map(item => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      cartStore.updateNewList();
    };
    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
      cartStore.clearCart();
    };
    // 3. 以对象的格式把state和action return
    return { userInfo, getUserInfo, clearUserInfo };
  },
  {
    persist: true, //可以自定义配置存储的地方，这是默认储存
  }
);
