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

// 根据项目id 回显项目基本信息
export const getProjectInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/queryProjectById/" + params.id,
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

// 项目详情
export const getProjectDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/projectDetail/" + params.id,
    params,
  });
};

// 进度详情
export const getScheduleDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress/pogressDetail/" + params.id,
    params,
  });
};

// 修改项目截止日期
export const setProjectDeadline = (data) => {
  return axios.request({
    method: "PUT",
    url: apiHost + "/projectProgress",
    data,
  });
};

// 进度批量催办
export const remindProgress = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/projectProgress/remind",
    data,
  });
};
