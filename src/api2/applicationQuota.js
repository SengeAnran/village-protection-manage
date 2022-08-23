import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 申报名额配置
export const getQuotaList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/quota/list`,
    data,
  });
}

// 详情 /api/workbench/declarationConfig/quota/detail
export const getdetail = (city) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + `/api/workbench/declarationConfig/quota/detail?city=${city}`,
  });
}

// 编辑提交

export const getadd = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/declarationConfig/quota/add`,
    data,
  });
}