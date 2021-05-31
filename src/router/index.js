import Vue from "vue";
import VueRouter from "vue-router";
import { constantRoutes, defaultRoutes } from "./navList";
import { getToken } from "@/utils/auth";
import lodash from "lodash";
import store from "@/store";

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

//定义全局守卫
router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token) {
    if (to.fullPath === "/login") {
      return next();
    } else {
      return next({ path: "/login", replace: true });
    }
  } else {
    // 根据token获取用户信息
    if (!store.getters.hasGetRoute) {
      // 如果没有获取路由信息，先获取路由信息而后跳转
      store.dispatch("user/getRouteList").then(() => {
        const list = lodash.cloneDeep(defaultRoutes);
        const asyncRoutes = getAsyncRoutes(list);
        store.commit("user/SET_ROUTE_LIST", asyncRoutes);
        router.addRoutes([
          {
            path: "/",
            name: "Index",
            component: () => import("@/layout"),
            redirect: {
              name: asyncRoutes.length ? asyncRoutes[0].name : "",
            },
            children: asyncRoutes,
          },
        ]);

        router.addRoutes([
          {
            path: "*",
            redirect: "/404",
          },
        ]);
        if (to.fullPath === "/login") {
          next("/");
          return;
        }
        // 如果直接使用 next() 刷新后会一直白屏
        next({ ...to, replace: true });
      });
    } else {
      if (to.fullPath === "/login") {
        next("/");
        return;
      }
      next();
    }
  }
});

const getAsyncRoutes = (list) => {
  const permissionIds = store.getters.permissionList.map((item) => item.menuId);
  return list.filter((item) => {
    const menuIds = item.meta && item.meta.menuIds;
    // 没有设置权限id 或者权限id为空数组，则默认为有访问权限
    const hasPermit =
      !menuIds ||
      !menuIds.length ||
      menuIds.find((it) => permissionIds.includes(it));
    // 有访问权限
    if (hasPermit) {
      // 有children
      if (item.children && item.children.length) {
        // 默认重定向到第一个子元素
        const childrenItem = getAsyncRoutes(item.children);
        if (childrenItem.length) {
          // 判断新增平台(当length>1)是否为第一个子路由, 如果是 将父路由 重定向设置为 第二个子路由
          item.redirect.name = childrenItem[0].name;
        }
        item.children = childrenItem;
        return item;
      } else {
        // 没有children
        return item;
      }
    }
    // 没有访问权限则什么都不返回
  });
};

export default router;
