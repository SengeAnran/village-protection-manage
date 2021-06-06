// 项目申报接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getProjectList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare",
    params,
  });
};

export const getProjectDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare/detail/" + id,
  });
};

export const createProject = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/projectDeclare",
    data,
  });
};

export const modifyProject = (data) => {
  return axios.request({
    method: "put",
    url: apiHost + "/projectDeclare",
    data,
  });
};
