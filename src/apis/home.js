import  httpInstance  from '@/utils/http'

// 轮播图
export function getBannerAPI () {
  return httpInstance.get('/home/banner')
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export function getNewsAPI () {
  return httpInstance.get('/home/new')
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return  httpInstance.get('home/hot', {})
}