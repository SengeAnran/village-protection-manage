import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost, apiHost2 } = config;

export const uploadFile = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/file/upload",
    data,
  });
};
export const uploadFile2 = (data) => {
  return axios.request({
    method: "post",
    url: apiHost2 + "/file/upload",
    data,
  });
};

export const downloadFile2 = (params) => {
  return axios.request({
    method: "get",
    url: apiHost2 + "/file/download/" + params.id,
  });
};

export const downloadFile = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/file/download/" + params.id,
  });
};

export const deleteFile = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/file",
    params,
  });
};
