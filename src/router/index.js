import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRoutes } from './navList';
import { getToken, verifyAuth } from '@/utils/auth';
import store from '@/store';
import config from '@/utils/config';
import addAsyncRoutes from './route';
import addAsyncRoutes2 from './route2';

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  base: config.routerBase,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

//定义全局守卫
router.beforeEach(async (to, from, next) => {
  if (!Object.keys(store.state.user.redirectUrl).length) {
    await store.dispatch('user/getRedirectUrl'); // 重新获取用户重定向链接
  }
  await verifyAuth();

  const token = getToken();
  if (!token) {
    // location.href = getLoginPath();
  } else {
    //console.log(to);
    if (!store.getters.hasGetUserCommonInfo) {
      // 用户基础信息
      store.dispatch('user/getUserCommonInfo');
    }
    if (to.name === 'home') {
      // 去home页面不用获取目录
      //console.log("to home");
      return next();
    } else if (!store.getters.hasGetRoute) {
      // 如果没有获取路由信息，先获取路由信息而后跳转
      const systemType = Number(window.localStorage.getItem('systemType'));
      //console.log("systemType",systemType)
      store.dispatch('user/getRouteList', systemType).then(() => {
        if (String(systemType) === '4') {
          const asyncRoutes = addAsyncRoutes2(systemType, router, store.getters.userInfo?.roleId);
          store.commit('user/SET_ROUTE_LIST', asyncRoutes); // 存储routeList
        } else {
          const asyncRoutes = addAsyncRoutes(systemType, router, store.getters.permissionList);
          store.commit('user/SET_ROUTE_LIST', asyncRoutes); // 存储routeList
        }
        // todo 添加其他内容
        if (to.fullPath === '/login') {
          next('/home');
          return;
        }
        // 如果直接使用 next() 刷新后会一直白屏
        next({ ...to, replace: true });
      });
    } else {
      if (to.fullPath === '/login') {
        next('/home');
        return;
      }
      const toPath = {
        '/projectApplication/detail': true,
        '/villageApplication/villageDetail': true,
      };
      const fromPath = {
        '/projectApplication/detail': {
          '/scheduleReport/index': true,
          '/projectAcceptance/index': true,
        },
        '/villageApplication/villageDetail': {
          '/planAudit/index': true,
          '/projectAcceptance/index': true,
        },
      };
      if (toPath[to.path] && fromPath[to.path][from.path]) {
        to.matched[1].otherRedirect = { name: to.query.name };
        to.matched[1].meta.otherTitle = to.query.title;
      } else if (toPath[to.path]) {
        to.matched[1].otherRedirect = '';
        to.matched[1].meta.otherTitle = '';
      }
      //console.log(to.path, from.path)
      next();
    }
  }
});

export default router;
