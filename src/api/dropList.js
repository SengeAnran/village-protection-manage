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
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 遗产地类型下拉列表
export const getHeritageType = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/heritageType",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 24节气下拉列表
export const getSolarTerms = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/solarTerms",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 乡村类型下拉列表
export const getVillageType = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/dropList/villageType",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 日志类型
export const getLogType = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost + '/systemLog/logType',
    params,
    // headers: { 'APPLICATION-ID': '3' },
  })
}

