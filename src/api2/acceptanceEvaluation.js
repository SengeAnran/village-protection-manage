import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 获取村级下拉
export const getCountyVillages = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/area/code/countyVillages',
    params,
  });
};

// 镇村二级联动
export const getVillageArea = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/main/dropList/area/${params.areaId}`,
    params,
  });
};

// 片区查询
export const getDistrictArea = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/area/list`,
    data,
  });
};

// 根据片区查村庄
export const getDistrictVillage = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/area/village/${data.name}`,
    data,
  });
};

// 回显基本数据 type(1：村庄名称，2：片区名称)
export const getAreaBaseInfo = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/find/${data.type}/${data.name}`,
    data,
  });
};

// 评价申报详情
export const getDetail = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/detail/${params.id}`,
    params,
  });
};

// 评价申报新增
export const saveInfo = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/save`,
    data,
  });
};
//评价申报更新
export const updateInfo = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/update`,
    data,
  });
};

// 评价申报列表查询
export const getReportList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/page`,
    data,
  });
};

// 评价申报列表查询
export const getAuditList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/page/audit`,
    data,
  });
};

// 市级审核
export const cityAudit = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/audit/city`,
    data,
  });
};

// 省级审核
export const provinceAudit = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/audit/province`,
    data,
  });
};

// 县级 获取待发数据
export const getCountyTempData = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/generation`,
    params,
  });
};

// 获取本次验收全市排名
export const getCityRanking = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/ranking`,
    data,
  });
};

// 评价申报删除
export const deleteItem = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/delete/${params.id}`,
    params,
  });
};

// 自评申报列表 - 导出
export const exportList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/export`,
    data,
    responseType: 'blob',
  });
};
// 导出附件
export const exportAnnex = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/export/annex`,
    data,
  });
};
// 查询所有已申报过的村庄（过滤已存在的）
export const filterVillageArea = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/villages`,
    params,
  });
};

// 统一上报
export const unifiedReporting = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/unifiedReporting`,
    data,
  });
};

// 验收上传扫描件
export const uploadScan = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/uploadScan`,
    params,
  });
};

// 材料打印
export const materialPrinting = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/materialPrinting/${params.id}`,
    responseType: 'blob',
  });
};
// 判断是否可以新增验收评价
export const createReportsCanSave = () => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/createReports/can/save`,
  });
};
