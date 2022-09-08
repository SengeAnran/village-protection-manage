import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 申报批次配置
export const getSetList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/batch/list`,
    data,
  });
}

// 【申报批次】可选批次查询
export const getActiveSetList = () => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/declarationConfig/optional/batch`,
  });
}

export const setUpdate = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/batch/add`,
    data,
  });
}
export const setAdd = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/batch/add`,
    data,
  });
}

export const setDelete = (id) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + `/api/workbench/declarationConfig/batch/delete/${id}`,
  });
}
