// 规划评审接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getPlanList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview",
    params,
  });
};

export const getPlanDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview/planReview/" + id,
  });
};

export const createPlan = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/planningReview",
    data,
  });
};

export const modifyPlan = (data) => {
  return axios.request({
    method: "put",
    url: apiHost + "/planningReview",
    data,
  });
};

// 审核 (村id)
export const verifyPlan = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/planningReview/verify",
    data,
  });
};

// 获取审核流程 (村id)
export const getProcess = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/planningReview/process/" + id,
  });
};

// 导出村庄详情
export const exportList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/planningReview/export",
    params,
    responseType: "blob"
  });
};
