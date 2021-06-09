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