import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 查询子节点
export const getProjectProgressReport = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/projectProgressReport`,
    params,
  });
};

// 验收评价统计
export const getAcceptanceStatistics = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/count`,
    data,
  });
};
