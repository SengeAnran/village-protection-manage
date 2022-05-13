import Cookies from 'js-cookie';
import config from '@/utils/config';

const TokenKey = 'access_token';
const LoginType = 'login_env_type';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getQueryToken(name, isHash) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var search = isHash ? window.location.hash : window.location.search;
  var r =
    search.substr(1).match(reg) || window.location.href.substr(window.location.href.lastIndexOf('?') + 1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function removeLocationSearch() {
  window.history.replaceState({}, 0, location.href.replace(location.search, ''));
}
const systemTitleType = {
  3: '历史文化村落保护管理应用',
  4: '浙江省未来乡村建设服务平台',
  1: '未来乡村小程序管理后台',
  2: '跟着节气游乡村管理后台',
};
export function verifyAuth() {
  // 获取url search token
  const token = getQueryToken('token');
  const systemType = getQueryToken('applicationId');
  if (systemType) {
    localStorage.setItem('systemType', systemType);
    localStorage.setItem('systemTitle', systemTitleType[systemType])
    setLoginType('in');
  }
  if (token) {
    // 设置token
    setToken(token);
  }
  // 移除链接中token、applicationId
  removeLocationSearch();
}

/**
 * @desc 设置loginType，区分登录入口  1. 三农：ext  2. 子系统：in
 */
export function setLoginType(value) {
  localStorage.setItem(LoginType, value || '');
}
export function getLoginType() {
  return localStorage.getItem(LoginType);
}

export function removeLoginType() {
  localStorage.removeItem(LoginType);
}
// 根据平台入口判断退出路径
export function getLoginPath(byToken) {
  const { sn_loginPath, loginPath } = config;
  const loginType = getLoginType();
  let path = '';
  if (loginType !== 'in' && sn_loginPath) {
    path = sn_loginPath;
  } else {
    if (byToken) { // token失效
      path = loginPath + 'login' + `?redirect_url=${encodeURIComponent(location.href)}&applicationId=${window.localStorage.getItem('systemType')}`;
    } else {
      path = loginPath + 'login' + `?redirect_url=${encodeURIComponent(location.protocol + '//' + location.host + config.routerBase + '/')}&applicationId=${window.localStorage.getItem('systemType')}`;
    }
    // path = loginPath + 'login' + `?redirect_url=${encodeURIComponent(location.protocol + '/' + location.host + config.routerBase)}&applicationId=${window.localStorage.getItem('systemType')}`;
  }
  return path;
  // return (loginType !== 'in' && loginPath) || sn_loginPath;
}

export function handleLoginOut(byToken) {
  removeToken();
  getLoginPath();
  location.href = getLoginPath(byToken);
  removeLoginType();
}
