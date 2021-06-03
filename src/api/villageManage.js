// 村庄申报、村庄审批
import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

// 村庄申报列表
export const getVillageList = (params) => {
  return axios.request({
    method: "GET",
    url: apiHost + "/villageDeclaration",
    params,
  });
};
