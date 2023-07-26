/** @format */

import httpInstance from '@/utils/http';

// 获取商品详情
export const getDetail = id => {
  return httpInstance.get('/goods', { params: { id } });
};
