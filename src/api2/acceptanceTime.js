import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 验收时间
export const getSetList = (data) => {
  return axios.request({
    method: 'POST',
    // url: apiHost2 + `/api/workbench/declarationConfig/time/list`,
    url: apiHost2 + `/api/workbench/declarationConfig/acceptance/list`,
    data,
  });
};

// 验收时间-不逮分页
export const getAllSetList = (data) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/declarationConfig/timeValues`,
    data,
  });
};

// 删除
export const setDelete = (id) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + `/api/workbench/declarationConfig/time/delete/${id}`,
  });
};

// 修改
export const setUpdate = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/acceptance/up`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};

//新增
export const setAdd = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/acceptance/up`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
