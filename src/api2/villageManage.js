// 未来乡村 村庄申报、村庄审批
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost2 } = config;

// 镇村二级联动
export const getVillageArea = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/area",
    params,
  });
};
// 查询申报批次和类型
export const queryTypeDeclaration = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/queryTypeDeclaration",
    params,
  });
};

// 查询批次信息
export const queryBatchInfo = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + "/api/workbench/villageDeclaration/queryBatchInfo",
    data,
  });
};
// 村庄推荐排序审核
export const recVerify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + "/api/workbench/villageDeclaration/recVerify",
    data,
  });
};

// 村庄推荐排序列表
export const getRecVillages = (params) => {
  return axios.request({
    method: "get",
    url: apiHost2 + "/api/workbench/villageDeclaration/recVillages",
    params,
  });
};

// 村庄申报列表
export const getVillageList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration",
    params,
  });
};

// 村庄申报
export const villageDeclaration = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + "/api/workbench/villageDeclaration",
    data,
  });
};

// 删除
export const deleteVillageItem = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + "/api/workbench/villageDeclaration/delete/Batch",
    data,
  });
};

// 村庄申报修改
export const updateVillageItem = (data) => {
  return axios.request({
    method: "PUT",
    url: apiHost2 + "/api/workbench/villageDeclaration",
    data,
  });
};

// 村庄申报详情
export const getVillageDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/detail",
    params,
  });
};

// 获取村庄详情
export const getVillageItemDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/detail",
    params,
  });
};

// // 省级 申报审核
// export const provinceVerify = (data) => {
//   return axios.request({
//     method: "POST",
//     url: apiHost2 + "/villageDeclaration/provinceVerify",
//     data,
//   });
// };

// 市级/省级 申报审核
export const verify = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + "/api/workbench/villageDeclaration/verify",
    data,
  });
};


// 可申请提升的村庄列表
export const getCanPromoteList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/detailList",
    params,
  });
};
// 导出村庄详情
export const getvillageDetailExport = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost2 + "/api/workbench/villageDeclaration/villageDetailExport/" + params.id,
    params,
    responseType: "blob"
  });
};
// 导出村庄详情
export const getvillagesExport = (data) => {
  return axios.request({
    method: "post",
    url: apiHost2 + "/api/workbench/villageDeclaration/export/list",
    data,
    responseType: "blob"
  });
};

// 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
export const setAdd = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/createReports/time/add/${data.type}/${data.acceptanceTime}`,
  });
};


// 验收时间-申报批次列表查询（type 1：验收时间，2：申报批次）
export const getSetList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/createReports/time/list`,
    data,
  });
};


// 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
export const setDelete = (id) => {
  return axios.request({
    method: "get",
    url: apiHost2 + `/api/workbench/createReports/time/delete/${id}`,
  });
};

// 验收时间-申报批次修改
export const setUpdate = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/createReports/time/update/${data.id}/${data.acceptanceTime}`,
  });
};

