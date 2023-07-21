<!-- @format -->
<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTopCategoryAPI } from '@/apis/category';
const categoryData = ref({});
const route = useRoute();
const getCategory = async () => {
  // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
  const res = await getTopCategoryAPI(route.params.id);
  categoryData.value = res.result;
};

onMounted(() => getCategory());
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div>我是 分类 页面</div>
</template>

<style lang="scss" scoped></style>
