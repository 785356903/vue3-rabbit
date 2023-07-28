/** @format */

import httpInstance from '@/utils/http';

export const loginAPI = data => {
  return httpInstance.post('/login', data);
};
