import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 查询子节点
export const getSonAreas = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/dropList/sonAreas`,
    params,
  });
};
// 预警提示
export const alertPrompt = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/alertPrompt`,
    params,
  });
};
