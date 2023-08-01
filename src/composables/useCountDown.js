/** @format */

// 封装倒计时逻辑函数

import { computed, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
export const useCountDown = () => {
  // 1. 响应式数据
  let timer = null;
  const time = ref(0);
  // 格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'));
  // 2. 开启倒计时函数
  const start = currentTime => {
    time.value = currentTime;
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };
  console.log();
  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer);
  });
  return {
    formatTime,
    start,
  };
};
