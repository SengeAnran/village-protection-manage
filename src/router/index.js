import Vue from "vue";
import VueRouter from "vue-router";
import AuthRouter from "./authRouter";

Vue.use(VueRouter);
export default new AuthRouter();

// import { asyncRoutes, constantRoutes } from "./navList";

// Vue.use(VueRouter);

// const routers = asyncRoutes;
// routers.push(...constantRoutes);

// const createRouter = () =>
//   new VueRouter({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: routers,
//   });

// const router = createRouter();

// export function resetRouter() {
//   const newRouter = createRouter();
//   router.matcher = newRouter.matcher; // reset router
// }

// export default router;
