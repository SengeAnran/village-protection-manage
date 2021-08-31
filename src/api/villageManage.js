// 村庄申报、村庄审批
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 镇村二级联动
export const getVillageArea = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/area",
    params,
  });
};

// 村庄申报列表
export const getVillageList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration",
    params,
  });
};

// 村庄申报
export const villageDeclaration = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration",
    data,
  });
};

// 删除
export const deleteVillageItem = (data) => {
  return axios.request({
    method: "DELETE",
    url: apiHost + "/villageDeclaration",
    data,
  });
};

// 村庄申报修改
export const updateVillageItem = (data) => {
  return axios.request({
    method: "PUT",
    url: apiHost + "/villageDeclaration",
    data,
  });
};

// 村庄申报详情
export const getVillageDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/detail/" + params.id,
    params,
  });
};

// 获取村庄详情
export const getVillageItemDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/villageDetail/" + params.id,
    params,
  });
};

// 市级|省级 申报审核
export const verify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration/verify",
    data,
  });
};

// 可申请提升的村庄列表
export const getCanPromoteList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/detailList",
    params,
  });
};
// 导出村庄详情
export const getvillageDetailExport = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/villageDetailExport/" + params.id,
    params,
    responseType: "blob"
  });
};
