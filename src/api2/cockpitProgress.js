import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 列表分页查询
export const pageQuery = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/village/progress/pageQuery`,
    data,
  });
};

// 地区下拉查询
export const getAreaList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/village/progress/area/list`,
    data,
  });
};

// 指标完成进度审核
export const auditProgress = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/village/progress/audit`,
    data,
  });
};
