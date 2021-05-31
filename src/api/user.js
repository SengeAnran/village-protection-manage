import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const pwdLogin = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/login",
    data,
  });
};

// 登出
export const logout = () => {
  return axios.post(`${apiHost}/logout`);
};

// 获取用户信息
export const getUserInfo = () => {
  return axios.get(`${apiHost}/user/info`);
};

// 获取当前用户菜单权限
export const getUserPermission = () => {
  return axios.get(`${apiHost}/user/menus`);
};

// 根据父级部门id 获取部门列表
export const getDepListById = (params) => {
  return axios.get(`${apiHost}/user/getDepByPid`, { params });
};

// 根据部门id 获取浙政钉用户列表
export const getUserListByDepId = (params) => {
  return axios.get(`${apiHost}/user/getUsersByDepId`, { params });
};

// 分页查询系统用户列表
export const getUserList = (params) => {
  return axios.get(`${apiHost}/user/page`, { params });
};

// 查询所有角色
export const getRoleList = () => {
  return axios.get(`${apiHost}/user/roles`);
};

// 根据父级区域id 获取区域列表
export const getAreaListById = (params) => {
  return axios.get(`${apiHost}/user/getAreaByPid`, { params });
};

// 解除授权
export const postAuth = (data) => {
  return axios.post(`${apiHost}/user/auth`, data);
};

// 解除授权
export const postUnAuth = (data) => {
  return axios.post(`${apiHost}/user/unAuth`, data);
};
