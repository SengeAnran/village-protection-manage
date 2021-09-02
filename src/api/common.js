import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const uploadFile = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/file/upload",
    data,
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
