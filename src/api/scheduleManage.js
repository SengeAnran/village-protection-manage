// 进度上报、进度监管
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 县级进度上报列表/省市级项目进度监管列表
export const getProjectProgress = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress",
    params,
  });
};

// 进度上报
export const addProjectProgress = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/projectProgress",
    data,
  });
};

// 可上报的项目项目所在地
export const getProjectProgressAddress = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/address/" + params.years,
    params,
  });
};

// 可上报的项目年度列表
export const getProjectProgressYears = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/years",
    params,
  });
};

// 历史进度 注意参数是项目id
export const getHistoryProgress = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/history/" + params.projectId,
    params,
  });
};
