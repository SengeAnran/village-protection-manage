import { QRCodeLogin } from "@/api/user";

const DOMAIN = "login-pro.ding.zj.gov.cn";
const CLIENT_ID = "gzjqyxc_dingoa";
const REDIRECT_URI = "http://223.4.76.24:8089/zlb/callback";

export const QRCodeUrl = `https://${DOMAIN}/oauth2/auth.htm?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=get_user_info&authType=QRCODE&embedMode=true`;

export function QRLogin() {
  return new Promise((resolve) => {
    window.addEventListener("message", function (event) {
      const origin = event.origin;
      if (origin == "https://" + DOMAIN) {
        console.log(event, event.data);
        console.log(JSON.stringify(event.data));
        console.log(JSON.stringify(event));

        const code = event.data.code;
        QRCodeLogin({ code }).then((res) => {
          resolve(res);
        });
      }
    });
  });
}
