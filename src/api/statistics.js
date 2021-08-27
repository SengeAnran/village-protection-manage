// 数据统计
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 获得图表数据
export const getEchartData = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/projectProgress",
    params,
  });
};
