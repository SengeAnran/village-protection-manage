// 下拉列表接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 区域下拉列表
export const getArea = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/area",
    params,
  });
};

// 遗产地类型下拉列表
export const getHeritageType = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/heritageType",
    params,
  });
};

// 24节气下拉列表
export const getSolarTerms = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/solarTerms",
    params,
  });
};

// 乡村类型下拉列表
export const getVillageType = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/villageType",
    params,
  });
};

// 日志类型
export const getLogType = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost + '/systemLog/logType',
    params
  })
}

