// 进度报送
import axios from "@/utils/request";
import config from "@/utils/config";
import qs from "qs";
const { apiHost2 } = config;

// 导出信息汇总表
export const getInforExport = (params) => {
  console.log('params',params)
  return axios.request({
    method: "get",
    url: apiHost2 + "/api/workbench/progressReport/export/list?ids=" + params.ids.toString(),
    // params,
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


// 报送列表查询
export const getList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/progressReport/page`,
    data,
  });
};
// 报送详情
export const getDetail = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/progressReport/detail/${data.id}`,
    data,
  });
};
// 报送历史
export const getHistory = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost2 + `/api/workbench/progressReport/history/${data.id}`,
    data,
  });
};
// 报送新增
export const addData = (data) => {
  return axios.request({
    method: "POST",
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