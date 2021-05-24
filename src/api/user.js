import axios from "@/utils/request";
import config from "@/utils/config";
const { apiHost } = config;

export const pwdLogin = (data) => {
  return axios.request({
    method: "post",
    url: apiHost + "/login",
    data,
  });
};
