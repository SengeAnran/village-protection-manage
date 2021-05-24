/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
];

export const asyncRoutes = [
  {
    path: "/",
    redirect: "/villageApplication",
  },
  // 村庄申报
  {
    path: "/villageApplication",
    component: Layout,
    children: [
      {
        path: "index",
        name: "村庄申报",
        meta: {
          title: "村庄申报",
          icon: "cunzhuangshenbao",
        },
        component: () => import("@/views/VillageApplication/index.vue"),
      },
    ],
  },
  // 村庄审核
  {
    path: "/villageAudit",
    component: Layout,
    redirect: "/villageAudit/index",
    children: [
      {
        path: "index",
        name: "村庄审核",
        meta: {
          title: "村庄审核",
          icon: "cunzhuangshenbao",
        },
        component: () => import("@/views/VillageAudit/index"),
      },
    ],
  },
  // 规划评审
  {
    path: "/planAudit",
    component: Layout,
    redirect: "/planAudit/index",
    children: [
      {
        path: "index",
        name: "规划评审",
        meta: {
          title: "规划评审",
          icon: "guihuapingshen",
        },
        component: () => import("@/views/PlanAudit/index"),
      },
    ],
  },
  // 项目申报
  {
    path: "/projectApplication",
    component: Layout,
    redirect: "/projectApplication/index",
    children: [
      {
        path: "index",
        name: "项目申报",
        meta: {
          title: "项目申报",
          icon: "xiangmushenbao",
        },
        component: () => import("@/views/ProjectApplication/index.vue"),
      },
    ],
  },
  // 项目审核
  {
    path: "/projectAudit",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        name: "项目审核",
        meta: {
          title: "项目审核",
          icon: "xiangmushenbao",
        },
        component: () => import("@/views/ProjectAudit/index"),
      },
    ],
  },
  // 进度上报
  {
    path: "/scheduleReport",
    component: Layout,
    redirect: "/scheduleReport/index",
    children: [
      {
        path: "index",
        name: "进度上报",
        meta: {
          title: "进度上报",
          icon: "jindushangbao",
        },
        component: () => import("@/views/ScheduleReport/index"),
      },
    ],
  },
  // 进度监管
  {
    path: "/scheduleSupervise",
    component: Layout,
    redirect: "/scheduleSupervise/index",
    children: [
      {
        path: "index",
        name: "进度监管",
        meta: {
          title: "进度监管",
          icon: "jindushangbao",
        },
        component: () => import("@/views/ScheduleSupervise/index"),
      },
    ],
  },
  // 项目验收
  {
    path: "/projectAcceptance",
    component: Layout,
    redirect: "/projectAcceptance/index",
    children: [
      {
        path: "index",
        name: "项目验收",
        meta: {
          title: "项目验收",
          icon: "xiangmuyanshou",
        },
        component: () => import("@/views/ProjectAcceptance/index"),
      },
    ],
  },
  // 系统管理
  {
    path: "/setting",
    component: Layout,
    redirect: "/setting/info",
    meta: { title: "系统管理", icon: "xitongguanli" },
    children: [
      {
        path: "/infoSetting",
        name: "信息库管理",
        meta: { title: "信息库管理" },
        component: () => import("@/views/Setting/Info/index.vue"),
      },
      {
        path: "/userSetting",
        name: "用户管理",
        meta: { title: "用户管理" },
        component: () => import("@/views/Setting/User/index.vue"),
      },
    ],
  },
  // 系统日志
  {
    path: "/logs",
    component: Layout,
    redirect: "/logs/index",
    children: [
      {
        path: "index",
        name: "系统日志",
        meta: { title: "系统日志", icon: "xitongrizhi" },
        component: () => import("@/views/Logs/index.vue"),
      },
    ],
  },
];
