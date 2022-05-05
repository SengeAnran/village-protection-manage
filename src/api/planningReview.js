// 规划评审接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;
import qs from 'qs'
export const getPlanList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const getPlanDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview/planReview/" + id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const createPlan = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/planningReview",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const modifyPlan = (data) => {
  return axios.request({
    method: "put",
    url: apiHost + "/planningReview",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 审核 (村id)
export const verifyPlan = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/planningReview/verify",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 获取审核流程 (村id)
export const getProcess = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview/process/" + id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 导出村庄详情
export const exportList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/planningReview/export/?" + qs.stringify(params),
    responseType: "blob",
    // headers: { 'APPLICATION-ID': '3' },
  });
};
