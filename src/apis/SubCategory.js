/** @format */

import httpInstance from '@/utils/http';

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = id => {
  return httpInstance.get('/category/sub/filter', { params: { id } });
};

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = data => {
  return httpInstance.post('/category/goods/temporary', data);
};
