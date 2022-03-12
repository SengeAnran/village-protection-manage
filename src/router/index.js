import Vue from "vue";
import VueRouter from "vue-router";
import { constantRoutes, defaultRoutes, defaultRoutes2 } from "./navList";
import { getToken } from "@/utils/auth";
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
    if (to.fullPath === "/login") {
      return next();
    } else {
      return next({ path: "/login", replace: true });
    }
  } else {
    console.log(to);
    if (to.fullPath === "/" || to.redirectedFrom === "/" || !store.getters.hasGetRoute) {
      // 根据token获取用户信息
      console.log(store.getters.changeSystem);
      console.log(store.getters.changeSystem || !store.getters.hasGetRoute);
      if (store.getters.changeSystem || !store.getters.hasGetRoute) { // 切换用户 或无目录
        // 如果没有获取路由信息，先获取路由信息而后跳转
        const roleSystemType = store.getters.roleSystemType; // 系统类型
        store.dispatch("user/getRouteList", roleSystemType).then(() => {
          const list = lodash.cloneDeep(roleSystemType === 2? defaultRoutes2 : defaultRoutes);
          console.log(list);
          const asyncRoutes = getAsyncRoutes(list, true);
          store.commit("user/SET_ROUTE_LIST", asyncRoutes); // 存储routeList
          console.log(router);
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
          console.log(router);
          router.addRoutes([
            {
              path: "*",
              redirect: "/404",
            },
          ]);
          // if (to.fullPath === "/villageApplication/index" && roleSystemType === 2) {
          //   next("/villageApplication2");
          //   return;
          // }
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
    // 根据token获取用户信息
    // if (!store.getters.hasGetRoute) {
    //   // 如果没有获取路由信息，先获取路由信息而后跳转
    //   // store.dispatch("user/getRouteList").then(() => {
    //   //   const list = lodash.cloneDeep(defaultRoutes);
    //   //   const asyncRoutes = getAsyncRoutes(list, true);
    //   //   store.commit("user/SET_ROUTE_LIST", asyncRoutes); // 存储routeList
    //   //   router.addRoutes([ // 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。
    //   //     {
    //   //       path: "/",
    //   //       name: "Index",
    //   //       component: () => import("@/layout"),
    //   //       redirect: {
    //   //         name: asyncRoutes.length ? asyncRoutes[0].name : "",
    //   //       },
    //   //       children: asyncRoutes,
    //   //     },
    //   //   ]);
    //   //
    //   //   router.addRoutes([
    //   //     {
    //   //       path: "*",
    //   //       redirect: "/404",
    //   //     },
    //   //   ]);
    //   //   if (to.fullPath === "/login") {
    //   //     next("/home");
    //   //     return;
    //   //   }
    //   //   // 如果直接使用 next() 刷新后会一直白屏
    //   //   next({ ...to, replace: true });
    //   // });
    // } else {
    //   if (to.fullPath === "/login") {
    //     next("/home");
    //     return;
    //   }
    //   const toPath = {
    //     "/projectApplication/detail": true,
    //     "/villageApplication/villageDetail": true,
    //   };
    //   const fromPath = {
    //     "/projectApplication/detail": {
    //       "/scheduleReport/index": true,
    //       "/projectAcceptance/index": true,
    //     },
    //     "/villageApplication/villageDetail": {
    //       "/planAudit/index": true,
    //       "/projectAcceptance/index": true,
    //     },
    //   };
    //   if (toPath[to.path] && fromPath[to.path][from.path]) {
    //     to.matched[1].otherRedirect = { name: to.query.name };
    //     to.matched[1].meta.otherTitle = to.query.title;
    //   } else if (toPath[to.path]) {
    //     to.matched[1].otherRedirect = '';
    //     to.matched[1].meta.otherTitle = '';
    //   }
    //   console.log(to.path, from.path)
    //   next();
    // }
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
});
/**
 * @param {Array} list 路由初始列表
 * @param {Boolean} isRoot 是否为根路由
 * @returns newList
 */
const getAsyncRoutes = (list, isRoot) => {
  const permissionList = store.getters.permissionList;
  const permissionIds = permissionList.map((item) => item.menuId);
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
