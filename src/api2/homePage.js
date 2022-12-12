import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 【首页】数量查询
export const getPreviewsNum = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/previewsNum`,
    params,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】建设概况
export const getConstructionOverview = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/constructionOverview`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】建设概况-各地市未来乡村创建数排名
export const getRanking = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/constructionOverview/ranking`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】未来乡村创建申报统计
export const getCountVillage = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/countVillage`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】项目开工率
export const getProjectRate = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/projectRate`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】投资完成率
export const getProgressReportTotal = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/progressReportTotal`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】各地市项目投资完成情况和总体进度情况
export const getProgressReport = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/progressReport`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】报送预警情况
export const getSubmitEarlyWarning = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/submitEarlyWarning`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】项目进度报送
export const getProjectProgressReport = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/projectProgressReport`,
    params,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】项目进度报送
export const getProjectProgressReportNew = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/staticProgressReport`,
    params,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 验收评价统计
export const getAcceptanceStatistics = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/count`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
// 【首页】评价等次总数 + 成效评分 + 一老一小服务场景建设情况
export const getEvaluationGradeCount = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/evaluationGrade/count`,
    data,
    headers: { 'APPLICATION-ID': 4 },
  });
};
