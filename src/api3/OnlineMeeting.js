// 未来乡村小程序 网上议事
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
// 参与用户搜索
export const getNamesList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/user/info/participate",
    data,
  });
};
// 获取列表
export const getList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/onlineNegotiate/admin/list",
    data,
  });
};

// 新增
export const addOne = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/onlineNegotiate/admin/add",
    data,
  });
};
// 删除
export const deleteOne = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/onlineNegotiate/admin/delete/" + params.id,
  });
};
// 审核
export const examine = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/onlineNegotiate/admin/check/" + params.id,
    params,
  });
};
// 获取详情
export const getDetail = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/onlineNegotiate/admin/detail/" + params.id,
  });
};
// // 修改详情
// export const modifyDetail = (data) => {
//   return axios.request({
//     method: "POST",
//     url: apiHost3 + "/api/admin/venue/admin/update",
//     data,
//   });
// };