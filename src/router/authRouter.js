import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import { asyncRoutes, constantRoutes } from "./navList";

const routers = asyncRoutes;
routers.push(...constantRoutes);

export default class AuthRouter extends VueRouter {
  constructor() {
    super({
      scrollBehavior: () => ({ y: 0 }),
      routes: routers,
    });
    this.configAuthRouter();
  }

  configAuthRouter() {
    this.beforeEach((to, from, next) => {
      const token = getToken();
      if (!token) {
        if (to.fullPath === "/login") {
          return next();
        } else {
          return next({ path: "/login", replace: true });
        }
      } else {
        if (to.fullPath === "/login") {
          next("/");
        }
        next();
      }
    });
  }
}
