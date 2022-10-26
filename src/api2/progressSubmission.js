// 进度报送
import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 导出信息汇总表
export const getInforExport = (params) => {
  console.log('params', params);
  return axios.request({
    method: 'get',
    url: apiHost2 + '/api/workbench/progressReport/export/list',
    params,
    responseType: 'blob',
  });
};

// 报送详情 - 导出
export const exportDetail = (data) => {
  console.log('data', data);
  return axios.request({
    method: 'POST',
    url: apiHost2 + '/api/workbench/progressReport/detailExport',
    // params,
    data: {
      ids: data.ids,
    },
    responseType: 'blob',
  });
};

// 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
export const setAdd = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/time/add/${data.type}/${data.acceptanceTime}`,
  });
};

// 报送列表查询
export const getList = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/page`,
    data,
  });
};
// 报送详情
export const getDetail = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/detail`,
    params,
  });
};
// 报送历史
export const getHistory = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/history/${data.id}`,
    data,
  });
};
// 报送新增
export const addData = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/save`,
    data,
  });
};

// // 获取验收时间-申报批次（type 1：验收时间，2：申报批次）
// export const getSetListAll = (type) => {
//   return axios.request({
//     method: "get",
//     url: apiHost2 + `/api/workbench/createReports/timeValues/${type}`,
//   });
// };
// 验收时间-申报批次新增（type 1：验收时间，2：申报批次）
export const setDelete = (id) => {
  return axios.request({
    method: 'get',
    url: apiHost2 + `/api/workbench/createReports/time/delete/${id}`,
  });
};

// 验收时间-申报批次修改
export const setUpdate = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/createReports/time/update/${data.id}/${data.acceptanceTime}`,
  });
};

// 获取填报回显
export const getFillInDEcho = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/fillingEcho/${params.id}`,
  });
};

// 报送新增
export const progressReportSave = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/save`,
    data,
  });
};

// 获取填报详情
export const progressReportDetail = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/project/detail`,
    params,
    // data,
  });
};

// 单个报送新增
export const postSaveOne = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/save/one`,
    data,
  });
};
// 县级-项目进度审核
export const countryAudit = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/progressReport/audit`,
    data,
  });
};
// 获取项目调度地区数
export const getObtainArea = () => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/obtain/area`,
  });
};
// 检查上月报送状态
export const getProgressReportCheck = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/progressReport/check`,
    params,
  });
};
