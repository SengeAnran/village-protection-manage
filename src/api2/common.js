import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 查询子节点
export const getSonAreas = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/main/dropList/sonAreas`,
    params,
  });
};