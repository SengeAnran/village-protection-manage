// 信息库管理
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 查询全部
export const getVillageInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/queryAll",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const getInfoList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/villageInfo",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const createInfo = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/villageInfo",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const modifyInfo = (data) => {
  return axios.request({
    method: "put",
    url: apiHost + "/villageInfo",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const deleteInfo = (ids) => {
  return axios.request({
    method: "delete",
    url: apiHost + "/villageInfo",
    data: ids,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const getAreaTree = () => {
  return axios.request({
    method: "get",
    url: apiHost + "/villageInfo/tree",
    // headers: { 'APPLICATION-ID': '3' },
  });
};
// 查询区域信息详情
export const getArea = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/villageInfo/queryArea/" + id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};
