// 项目验收接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getAcceptanceList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/acceptanceInfo",
    params,
  });
};

export const getAcceptanceDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/acceptanceInfo/detail/" + id,
  });
};

// 提交验收（有审核状态）
export const verify = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/acceptanceInfo/verify",
    data,
  });
};

// 县提交验收（无审核状态）
export const verifyByCounty = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/acceptanceInfo",
    data,
  });
};

// 整改详情
export const getRectificationInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/acceptanceInfo/rectification/" + params.id,
    params,
  });
};

// 项目详情
export const getAcceptanceInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/acceptanceInfo/projectDetail/" + params.id,
    params,
  });
};
