import { QRCodeLogin } from "@/api/user";

let DOMAIN, CLIENT_ID, REDIRECT_URI, QRCodeUrl;

if (process.env.VUE_APP_ENV === "production") {
  DOMAIN = "login-pro.ding.zj.gov.cn";
  CLIENT_ID = "gzjqyxc_dingoa";
  REDIRECT_URI = "http://223.4.76.24:8089/zlb/callback";
  QRCodeUrl = `https://${DOMAIN}/oauth2/auth.htm?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=get_user_info&authType=QRCODE&embedMode=true`;
} else {
  DOMAIN = "login.dg-work.cn";
  CLIENT_ID = "farming_dingding_test_dingoa";
  REDIRECT_URI = "http://172.16.24.248:8180/zlb/callback";
  QRCodeUrl = `https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=get_user_info&authType=QRCODE&embedMode=true`;
}

const QRLogin = function () {
  return new Promise((resolve) => {
    window.addEventListener("message", function (event) {
      const origin = event.origin;
      if (origin == "https://" + DOMAIN) {
        //console.log(event, event.data);
        //console.log(JSON.stringify(event.data));
        //console.log(JSON.stringify(event));

        const code = event.data.code;
        QRCodeLogin({ code }).then((res) => {
          resolve(res);
        });
      }
    });
  });
};

export { QRCodeUrl, QRLogin };
