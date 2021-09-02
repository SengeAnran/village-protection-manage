// 政策接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/policyFile",
    params,
  });
};
// 新增
export const createPolicy = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/policyFile",
    data,
  });
};


// 删除
export const deletePolicy = (data) => {
  return axios.request({
    method: "DELETE",
    url: apiHost + "/policyFile",
    data,
  });
};

