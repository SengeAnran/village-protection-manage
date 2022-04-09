// 未来乡村小程序 场馆预约
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost3 } = config;

// 获取场馆列表
export const getVenueList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/applet/venue/app/list",
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
export const deleteVenue = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/villageDeclaration",
    data,
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
export const modifyVenueDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/venue/admin/update/" + params.id,
    params,
  });
};