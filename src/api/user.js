import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost, apiHost2, apiHost3 } = config;

export const pwdLogin = (data) => {
  return axios.request({
    method: 'post',
    // url: apiHost + '/login',
    url: apiHost3 + '/api/user/login/pc',
    data,
  });
};

// 浙政钉扫码登录
export const QRCodeLogin = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost + '/loginByQrCode',
    data,
  });
};

// 登出
export const logout = (data) => {
  return axios.request({
    method: 'post',
    url: apiHost + '/logout?loginType=' + data,
  });
  // return axios.post(`${apiHost}/logout`);
};

// 解除绑定
export const unBind = (params) => {
  return axios.request({
    method: 'GET',
    url: apiHost + '/user/unBind',
    params,
  });
};

// 获取用户基础信息
export const getUserCommonInfo = () => {
  // return axios.get(`${apiHost}/user/info`);
  return axios.get(`${apiHost3}/api/user/user/in`);
};
// 获取用户信息
export const getUserInfo = (aplicationId) => {
  // return axios.get(`${apiHost}/user/info`);
  return axios.request({
    method: "GET",
    url: `${apiHost3}/api/user/user/info`,
    headers: { 'APPLICATION-ID': `${aplicationId}` },
  });
};
// // 获取用户信息
// export const getUserInfo2 = () => {
//   return axios.request({
//     method: "GET",
//     url: `${apiHost3}/api/user/user/info`,
//     headers: { 'APPLICATION-ID': '4' },
//   });
// };

// 获取当前用户菜单权限 历史文化
export const getUserPermission = () => {
  // return axios.get(`${apiHost}/user/menus`);
  return axios.request({
    method: "GET",
    url: `${apiHost3}/api/user/user/menus`,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 获取当前用户菜单权限 未来乡村
export const getUserPermission2 = () => {
  return axios.get(`${apiHost2}/user/menus`);
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
// 修改权限
export const editUser = (params) => {
  return axios.get(`${apiHost}/user/editUser`, { params });
};
// 子系统扫码绑定
export const scanBinding = (data) => {
  return axios.post(`${apiHost}/scanBinding`, data);
};
