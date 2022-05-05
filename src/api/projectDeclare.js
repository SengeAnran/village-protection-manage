// 项目申报接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getProjectList = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare",
    params,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const getProjectDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare/detail/" + id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const createProject = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/projectDeclare",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

export const modifyProject = (data) => {
  return axios.request({
    method: "put",
    url: apiHost + "/projectDeclare",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 项目审核
export const verifyProject = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/projectDeclare/verify",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};
// 项目审核详情
export const verifyDetail = (id) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare/verifyDetail?id=" + id,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 获取项目所在地
export const getAddress = () => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare/villageDetailList",
    // headers: { 'APPLICATION-ID': '3' },
  });
};

// 项目删除
export const deleteProject = (data) => {
  return axios.request({
    method: "DELETE",
    url: apiHost + "/projectDeclare",
    data,
    // headers: { 'APPLICATION-ID': '3' },
  });
};

//
// // 导出
// export const pogressExport = (params) => {
//   return axios.request({
//     method: "get",
//     url: apiHost + "/projectDeclare/exportExcelList" + params.id,
//     responseType: "blob"
//   });
// };


// 导出
export const pogressExport = (params) => {
  return axios.request({
    method: "get",
    url: apiHost + "/projectDeclare/exportExcelList",
    params,
    responseType: "blob",
    // headers: { 'APPLICATION-ID': '3' },
  });
};
