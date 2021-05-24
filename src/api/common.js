import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const uploadFile = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/file/upload",
    data,
  });
};
