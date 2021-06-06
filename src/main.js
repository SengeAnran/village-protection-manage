import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "tailwindcss/tailwind.css";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/index.scss";
import "./icons"; // icon

import "@/components/global.js";
import components from "@/utils/component.js";
import "./directive/index.js"; // 指令注册

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: "small",
});
Vue.use(components);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
