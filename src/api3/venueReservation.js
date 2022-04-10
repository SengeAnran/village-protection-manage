// 未来乡村小程序 场馆预约
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost3 } = config;
// 省市县镇村五级联动
export const getVillageArea = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/dropList/area",
    params,
  });
};
// 查询子节点
export const getChildArea = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/dropList/sonAreas",
    params,
  });
};
// 获取场馆列表
export const getVenueList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/venue/admin/list",
    data,
  });
};

// 新增场馆
export const addVenue = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/venue/admin/add",
    data,
  });
};
// 删除场馆
export const deleteVenue = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/venue/admin/delete/" + params.id,
  });
};
// 获取场馆详情
export const getVenueDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/venue/admin/detail/" + params.id,
  });
};
// 修改场馆详情
export const modifyVenueDetail = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/venue/admin/update",
    data,
  });
};