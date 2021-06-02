import { QRCodeLogin } from "@/api/user";

const CLIENT_ID = "farming_dingding_test_dingoa";
const REDIRECT_URI = "http://172.16.24.248:8180/zlb/callback";
export const QRCodeUrl = `https://login.dg-work.cn/oauth2/auth.htm?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=get_user_info&authType=QRCODE&embedMode=true`;

export function QRLogin() {
  return new Promise((resolve) => {
    window.addEventListener("message", function (event) {
      const origin = event.origin;
      if (origin == "https://login.dg-work.cn") {
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
