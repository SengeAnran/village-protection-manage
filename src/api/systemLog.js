// 系统日志接口
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const getSystemLog = (params) => {
  return axios.request({
    method: 'get',
    url: apiHost + '/systemLog/list',
    params,
  })
};

