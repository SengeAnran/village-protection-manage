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
    headers: { 'APPLICATION-ID': '3' },
  });
};
// 查询申报批次和类型
export const queryTypeDeclaration = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/queryTypeDeclaration",
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 查询批次信息
export const queryBatchInfo = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration/queryBatchInfo",
    data,
  });
};
// 村庄推荐排序审核
export const recVerify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration/recVerify",
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 村庄推荐排序列表
export const getRecVillages = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/villageDeclaration/recVillages",
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 村庄申报列表
export const getVillageList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration",
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 村庄申报
export const villageDeclaration = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration",
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 删除
export const deleteVillageItem = (data) => {
  return axios.request({
    method: "DELETE",
    url: apiHost + "/villageDeclaration",
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 村庄申报修改
export const updateVillageItem = (data) => {
  return axios.request({
    method: "PUT",
    url: apiHost + "/villageDeclaration",
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 村庄申报详情
export const getVillageDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/detail",
    params,
  });
};

// 获取村庄详情
export const getVillageItemDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/villageDetail/" + params.id,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 省级 申报审核
export const provinceVerify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration/provinceVerify",
    data,
  });
};

// 市级 申报审核
export const verify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost + "/villageDeclaration/verify",
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 可申请提升的村庄列表
export const getCanPromoteList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/detailList",
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};
// 导出村庄详情
export const getvillageDetailExport = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration/villageDetailExport/" + params.id,
    params,
    responseType: "blob",
    headers: { 'APPLICATION-ID': '3' },
  });
};
