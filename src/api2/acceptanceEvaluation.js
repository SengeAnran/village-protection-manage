import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost2 } = config;

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
