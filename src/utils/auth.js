import Cookies from "js-cookie";

const TokenKey = "access_token";

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
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var search = isHash ? window.location.hash : window.location.search;
  var r =
    search.substr(1).match(reg) ||
    window.location.href
      .substr(window.location.href.lastIndexOf("?") + 1)
      .match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

export function removeLocationSearch() {
  window.history.replaceState(
    {},
    0,
    location.href.replace(location.search, "")
  );
}

export function verifyAuth() {
  // 获取url search token
  const token = getQueryToken("token");
  if (token) {
    // 设置token
    setToken(token);
  }
  // 移除链接中token
  removeLocationSearch();
}
