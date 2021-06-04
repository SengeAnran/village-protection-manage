// 信息库管理
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 查询全部
export const getVillageInfo = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/queryAll",
    params,
  });
};
