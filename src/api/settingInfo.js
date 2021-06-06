import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 分页查询
export const getVillageInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo",
    params,
  });
};

// 新增
export const addVillageInfo = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageInfo",
    data,
  });
};

// 修改
export const updateVillageInfo = (data) => {
  return axios.request({
    method: "PUT",
    url: apiHost + "/villageInfo",
    data,
  });
};

// 删除
export const deleteVillageInfo = (data) => {
  return axios.request({
    method: "DELETE",
    url: apiHost + "/villageInfo",
    data,
  });
};

// 获取区域树结构
export const getVillageInfoTree = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/tree",
    params,
  });
};
