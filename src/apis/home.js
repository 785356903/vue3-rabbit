import  httpInstance  from '@/utils/http'

export function getBannerAPI () {
  return httpInstance.get('/home/banner')
}