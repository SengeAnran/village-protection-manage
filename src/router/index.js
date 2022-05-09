import Vue from "vue";
import VueRouter from "vue-router";
import { constantRoutes } from "./navList";
import { routeType } from "../utils/routeType";
import { getToken, getLoginPath } from "@/utils/auth";
import lodash from "lodash";
import store from "@/store";
import config from "@/utils/config";

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  base: config.routerBase,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});


//定义全局守卫
router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token) {
    location.href = getLoginPath();
    // if (to.fullPath === "/login") {
    //   return next();
    // } else {
    //   return next({ path: "/login", replace: true });
    // }
  } else {
    console.log(to);
    if (!store.getters.hasGetUserCommonInfo) { // 用户基础信息
      store.dispatch("user/getUserCommonInfo");
    }
    if (to.name === "home") { // 去home页面不用获取目录
      console.log("to home");
      return next();
    } else if (!store.getters.hasGetRoute) {
      // 如果没有获取路由信息，先获取路由信息而后跳转
      const systemType = Number(window.localStorage.getItem("systemType"));
      console.log("systemType",systemType)
      store.dispatch("user/getRouteList", systemType).then(() => {
        const list = lodash.cloneDeep(routeType[systemType]);
        const asyncRoutes = getAsyncRoutes(list, true);
        console.log(list, asyncRoutes);
        store.commit("user/SET_ROUTE_LIST", asyncRoutes); // 存储routeList
        router.addRoutes([ // 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。
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
          next("/home");
          return;
        }
        // 如果直接使用 next() 刷新后会一直白屏
        next({ ...to, replace: true });
      });
    } else {
      if (to.fullPath === "/login") {
        next("/home");
        return;
      }
      const toPath = {
        "/projectApplication/detail": true,
        "/villageApplication/villageDetail": true,
      };
      const fromPath = {
        "/projectApplication/detail": {
          "/scheduleReport/index": true,
          "/projectAcceptance/index": true,
        },
        "/villageApplication/villageDetail": {
          "/planAudit/index": true,
          "/projectAcceptance/index": true,
        },
      };
      if (toPath[to.path] && fromPath[to.path][from.path]) {
        to.matched[1].otherRedirect = { name: to.query.name };
        to.matched[1].meta.otherTitle = to.query.title;
      } else if (toPath[to.path]) {
        to.matched[1].otherRedirect = '';
        to.matched[1].meta.otherTitle = '';
      }
      console.log(to.path, from.path)
      next();
    }
  }
});
/**
 * @param {Array} list 路由初始列表
 * @param {Boolean} isRoot 是否为根路由
 * @returns newList
 */
const getAsyncRoutes = (list, isRoot) => {
  const permissionList = store.getters.permissionList;
  const permissionIds = permissionList.map((item) => item.menuId);
  console.log(list);
  return list.filter((item) => {
    const menuIds = item.meta && item.meta.menuIds;
    // 没有设置权限id 或者权限id为空数组，则默认为有访问权限
    const hasPermit =
      !menuIds ||
      !menuIds.length ||
      menuIds.find((it) => permissionIds.includes(it));
    // 有访问权限
    if (hasPermit) {
      if (isRoot) {
        const result = permissionList.find((item) =>
          menuIds.includes(item.menuId)
        );
        item.meta.title = result.menuName || item.meta.title;
      }
      // 有children
      if (item.children && item.children.length) {
        // 默认重定向到第一个子元素
        const childrenItem = getAsyncRoutes(item.children);
        if (childrenItem.length && item.redirect) {
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
