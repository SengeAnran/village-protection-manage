// 数据统计
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 获得图表数据  获取全省内已申报的村庄分布统计情况
export const getEchartData = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/villageDistribution",
    params,
  });
};

// 导出全省范围内已申报的村庄分布数据统计结果
export const exportData = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/export",
    params,
    responseType: "blob"
  });
};

// 导出全省范围内已申报的村庄分布数据统计结果
export const getList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageInfo/villageDistributionList",
    params,
  });
};
