import axios from '@/utils/request';
import config from '@/utils/config';
const { apiHost, apiHost3 } = config;

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
    url: apiHost3 + '/api/user/login/pc/logout?loginType=' + data,
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

// 获取当前用户菜单权限
export const getUserPermission = (aplicationId) => {
  // return axios.get(`${apiHost}/user/menus`);
  return axios.request({
    method: "GET",
    url: `${apiHost3}/api/user/user/menus`,
    headers: { 'APPLICATION-ID': `${aplicationId}` },
  });
};

// // 获取当前用户菜单权限 未来乡村
// export const getUserPermission2 = () => {
//   return axios.get(`${apiHost2}/user/menus`);
// };

// 根据父级部门id 获取部门列表
export const getDepListById = (params) => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/getDepByPid`,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 根据部门id 获取浙政钉用户列表
export const getUserListByDepId = (params) => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/getUsersByDepId`,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 分页查询系统用户列表
export const getUserList = (params) => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/page`,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 查询所有角色
export const getRoleList = () => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/roles`,
    headers: { 'APPLICATION-ID': '3' }
  });
};

// 根据父级区域id 获取区域列表
export const getAreaListById = (params) => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/getAreaByPid`,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};

// 授权
export const postAuth = (data) => {
  return axios.request({
    method: 'post',
    url: `${apiHost3}/api/user/user/auth`,
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};
// 解除授权
export const postUnAuth = (data) => {
  return axios.request({
    method: 'post',
    url: `${apiHost3}/api/user/user/unAuth`,
    data,
    headers: { 'APPLICATION-ID': '3' },
  });
};
// 修改权限
export const editUser = (params) => {
  return axios.request({
    method: 'get',
    url: `${apiHost3}/api/user/user/editUser`,
    params,
    headers: { 'APPLICATION-ID': '3' },
  });
};
// 子系统扫码绑定
export const scanBinding = (data) => {
  return axios.post(`${apiHost}/scanBinding`, data);
};
