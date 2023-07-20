import { useIntersectionObserver } from '@vueuse/core'

// 定义懒加载插件
export const lazyPlugin = {
  // 固定方法 install 
  // 用来加载自定义指令
  install(app){
    // 懒加载逻辑
    app.directive('img-lazy', {
      mounted(el, binding ) {
        // el:指令绑定的那个元素 img
        // binding: binding.value 指令等于号后面的表达式的值
        console.log(el,binding);
        const { stop } = useIntersectionObserver(
          el,
          //  通过isIntersecting判断该视图区域 是否在屏幕内 返回boolean
          ([{ isIntersecting }]) => {
            // 进入视口区域
            if(isIntersecting){
              el.src = binding.value
              // useIntersectionObserver是一直存在的 
              // 手动优化停止监听
              stop()
            }
          },
        )
      },
    })
  }
}
export default lazyPlugin


