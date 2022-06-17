import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

// 【首页】数量查询
export const getPreviewsNum = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/previewsNum`,
    params,
  });
};
// 【首页】未来乡村创建申报统计
export const getCountVillage = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost2 + `/api/workbench/index/countVillage`,
    data,
  });
};
// 【首页】项目进度报送
export const getProjectProgressReport = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost2 + `/api/workbench/index/projectProgressReport`,
    params,
  });
};
// 验收评价统计
export const getAcceptanceStatistics = (data) => {
  return axios.request({
    method: 'POST',
    url: apiHost2 + `/api/workbench/index/count`,
    data,
  });
};