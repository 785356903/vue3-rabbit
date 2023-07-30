/** @format */

// 封装购物车模块

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart';
export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);
    //1. 定义state - cartList
    const cartList = ref([]);

    //2. 定义action - addCart
    // 获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    const addCart = async goods => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count });
        updateNewList();
      } else {
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
      }
    };

    // 删除购物车
    const delCart = async skuId => {
      if (isLogin.value) {
        // 调用接口实现接口购物车中的删除功能
        console.log(skuId);
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        // 思路:
        // 1.找出要删除的下角标 - splice
        // 2.过滤方法筛 - filter
        cartList.value = cartList.value.filter(v => v.skuId != skuId);
      }
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find(v => v.skuId == skuId);
      item.selected = selected;
    };

    //全选功能
    const allCheck = selected => {
      cartList.value.forEach(v => (v.selected = selected));
    };

    //计算属性
    // 1. 总的数量所有项的count之和reduce((每一次累加之后的和,每一项)=>a+c,设置初始值为零)
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    // 2. 总价所有项的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    // 3. 选中数量
    const selectedCount = computed(() =>
      cartList.value.filter(v => v.selected).reduce((a, c) => a + c.count, 0)
    );

    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value.filter(v => v.selected).reduce((a, c) => a + c.count * c.price, 0)
    );
    // 是否全选  所有单选都为true 全选选中
    const isAll = computed(() => cartList.value.every(v => v.selected == true));

    return {
      cartList,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      isAll,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      updateNewList,
    };
  },
  {
    persist: true, //可以自定义配置存储的地方，这是默认储存
  }
);
