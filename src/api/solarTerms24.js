// 24节气村接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getVillageList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/solarTermsVillage/list",
    params,
  });
};

export const getVillageDetail = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/solarTermsVillage/detail",
    params,
  });
};

export const createVillage = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/solarTermsVillage/create",
    data,
  });
};

export const deleteVillage = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/solarTermsVillage/delete",
    params,
  });
};

export const modifyVillage = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/solarTermsVillage/modify",
    data,
  });
};
