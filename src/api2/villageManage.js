// 未来乡村 村庄申报、村庄审批
import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 镇村二级联动
export const getVillageArea = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/area',
    params,
  });
};
// 查询申报批次和类型
export const queryTypeDeclaration = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/queryTypeDeclaration',
    params,
  });
};

// 查询批次信息
export const queryBatchInfo = () => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/declarationConfig/batch/list`,
    data: {
      pageNum: 1,
      pageSize: 2000,
    },
  });
  // return axios.request({
  //   method: 'POST',
  //   url: apiHost2 + '/api/workbench/villageDeclaration/queryBatchInfo',
  //   data,
  // });
};
// 村庄推荐排序审核
export const recVerify = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration/recVerify',
    data,
  });
};

// 村庄推荐排序列表
export const getRecVillages = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + '/api/workbench/villageDeclaration/recVillages',
    params,
  });
};

// 村庄申报列表
export const getVillageList = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration',
    params,
  });
};

// 村庄申报
export const villageDeclaration = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration',
    data,
  });
};

// 删除
export const deleteVillageItem = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration/delete/Batch',
    data,
  });
};

// 村庄申报修改
export const updateVillageItem = (data) => {
  return axios.request({
    method: 'PUT',
    url: apiHost2 + '/api/workbench/villageDeclaration',
    data,
  });
};

// 村庄申报详情
export const getVillageDetail = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/detail',
    params,
  });
};

// 获取村庄详情
export const getVillageItemDetail = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/detail',
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
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration/verify',
    data,
  });
};

// 可申请提升的村庄列表
export const getCanPromoteList = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/detailList',
    params,
  });
};
// 导出村庄详情
export const getvillageDetailExport = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/villageDetailExport/' + params.id,
    params,
    responseType: 'blob',
  });
};
// 导出村庄详情
export const getvillagesExport = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + '/api/workbench/villageDeclaration/export/list',
    params,
    responseType: 'blob',
  });
};

// 批量导入未来乡村创建项目备案表
export const importBatch = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + '/api/workbench/villageDeclaration/import/batch',
    data,
  });
};

// 下载未来乡村创建项目备案表模板
export const getTemplate = () => {
  return axios.request({
    method: 'get',
    url: apiHost2 + '/api/workbench/villageDeclaration/download/template',
    responseType: 'blob',
  });
};
// // 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
// export const setAdd = (data) => {
//   return axios.request({
//     method: 'POST',
//     url: apiHost2 + `/api/workbench/createReports/time/add/${data.type}/${data.acceptanceTime}`,
//   });
// };

// // 验收时间-申报批次列表查询（type 1：验收时间，2：申报批次）
// export const getSetList = (data) => {
//   return axios.request({
//     method: 'POST',
//     url: apiHost2 + `/api/workbench/createReports/time/list`,
//     data,
//   });
// };

// 获取验收时间-申报批次（type 1：验收时间，2：申报批次）
// export const getSetListAll = (type) => {
//   return axios.request({
//     method: 'get',
//     url: apiHost2 + `/api/workbench/createReports/timeValues/${type}`,
//   });
// };
// // 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
// export const setDelete = (id) => {
//   return axios.request({
//     method: 'get',
//     url: apiHost2 + `/api/workbench/createReports/time/delete/${id}`,
//   });
// };

// // 验收时间-申报批次修改
// export const setUpdate = (data) => {
//   return axios.request({
//     method: 'POST',
//     url: apiHost2 + `/api/workbench/createReports/time/update/${data.id}/${data.acceptanceTime}`,
//   });
// };
// 材料打印
export const materialPrinting = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/villageDeclaration/materialPrinting`,
    data,
    responseType: 'blob',
  });
};

// 排序
export const sortList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration/sort',
    data,
  });
};
// 统一上报
export const unifiedReporting = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/villageDeclaration/unifiedReporting',
    data,
  });
};

// 上传扫描件
export const uploadScan = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/uploadScan',
    params,
  });
};

// 获取新增时待发数据
export const getGeneration = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/generation',
    params,
  });
};
// 列表-市级下拉
export const getCityList = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/cityList',
    params,
    headers: { 'APPLICATION-ID': `${4}` },
  });
};
// 列表-省级下拉
export const getProList = () => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/villageDeclaration/proList',
    headers: { 'APPLICATION-ID': `${4}` },
  });
};

// 获取所有的报送时间
export const getTime = () => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + '/api/workbench/progressReport/getTime',
    headers: { 'APPLICATION-ID': `${4}` },
  });
};
