// 未来乡村小程序 用户
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost3 } = config;

// // 获取当前用户菜单权限 未来乡村小程序
// export const getUserPermission3 = () => {
//   return axios.get(`${apiHost3}/api/admin/user/getDepByPid`);
// };

// 获取当前用户菜单权限 未来乡村小程序
export const getUserPermission3 = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/user/getDepByPid",
    params,
  });
};

// 获取用户信息
export const geUserInfo3 = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + "/api/admin/user/info",
    params,
  });
};