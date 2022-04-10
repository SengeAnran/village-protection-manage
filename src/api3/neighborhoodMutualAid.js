// 未来乡村小程序 场馆预约
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost3 } = config;

// 列表
export const getHelpList = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + "/api/admin/friendHelp/admin/list",
    data,
  });
};

// 删除互助事项
export const deleteHelp = (id) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + `/api/admin/friendHelp/admin/delete/${id}`,
  });
};

//互助事项详情
export const getHelpDetail = (id) => {
  return axios.request({
    method: "GET",
    url: apiHost3 + `/api/admin/friendHelp/admin/detail/${id}`,
  });
};

// 审核是否通过（按照提示传状态值）
export const changeStatus = (data) => {
  return axios.request({
    method: "POST",
    url: apiHost3 + `/api/admin/friendHelp/admin/changeStatus`,
    data,
  });
};
