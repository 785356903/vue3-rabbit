<!-- @format -->

<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/SubCategory';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import GoodsItem from '../Home/components/GoodsItem.vue';

// 面包屑导航 获取二级分类列表数据
const route = useRoute();
console.log(route.params.id);
const filterData = ref([]);

const getCategoryFilter = async (id = route.params.id) => {
  const res = await getCategoryFilterAPI(id);
  filterData.value = res.result;
};

onMounted(() => getCategoryFilter(route.params.id));

// 获取基础列表数据渲染
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
});
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = res.result.items;
};
onMounted(() => getGoodList());

// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField);
  reqData.value.page = 1;
  getGoodList();
};

// 加载更多
// 定义无限滚动 加载下一页 数据拼接 结束监听
const disabled = ref(false);
const load = async () => {
  reqData.value.page++;
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = [...goodsList.value, ...res.result.items];
  if (res.result.items.length === 0) {
    disabled.value = true;
  }
};
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">
          {{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodsList" :key="item.id" :good="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    li {
      width: 220px;
      margin: 0 8px;
    }
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 50px;
    text-align: center;

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

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
