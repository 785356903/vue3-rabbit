/** @format */

// 封装分类数据相关的业务代码
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { getTopCategoryAPI } from '@/apis/category';

export function useCategory() {
  const route = useRoute();

  // 获取分类列表 category
  const categoryData = ref({});
  const getCategory = async (id = route.params.id) => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.result;
  };

  onMounted(() => getCategory());
  onBeforeRouteUpdate(to => {
    getCategory(to.params.id);
  });

  return {
    categoryData,
  };
}
