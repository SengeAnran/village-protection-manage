import BlankRouteNode from "./BlankRouteNode";

export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
];

export const defaultRoutes = [
  // 村庄申报
  {
    path: "/villageApplication",
    component: BlankRouteNode,
    name: "VillageApplication",
    redirect: {
      name: "VillageApplyList",
    },
    children: [
      {
        path: "index",
        name: "VillageApplyList",
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
    component: BlankRouteNode,
    name: "VillageAudit",
    redirect: {
      name: "VillageAuditList",
    },
    children: [
      {
        path: "index",
        name: "VillageAuditList",
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
    component: BlankRouteNode,
    name: "PlanAudit",
    redirect: {
      name: "PlanAuditList",
    },
    children: [
      {
        path: "index",
        name: "PlanAuditList",
        meta: {
          title: "规划评审",
          icon: "guihuapingshen",
        },
        component: () => import("@/views/PlanAudit/index"),
      },
      {
        path: "/planAudit/save",
        name: "PlanAuditSave",
        hidden: true,
        meta: {
          title: "评审",
          noCache: true,
          activeMenu: "/planAudit/index",
        },
        component: () => import("@/views/PlanAudit/Save"),
      },
      {
        path: "/planAudit/detail",
        name: "PlanAuditDetail",
        hidden: true,
        meta: {
          title: "评审详情",
          noCache: true,
          activeMenu: "/planAudit/index",
        },
        component: () => import("@/views/PlanAudit/Detail"),
      },
    ],
  },
  // 项目申报
  {
    path: "/projectApplication",
    component: BlankRouteNode,
    name: "ProjectApply",
    redirect: {
      name: "ProjectApplyList",
    },
    children: [
      {
        path: "index",
        name: "ProjectApplyList",
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
    component: BlankRouteNode,
    name: "ProjectAudit",
    redirect: {
      name: "ProjectAuditList",
    },
    children: [
      {
        path: "index",
        name: "ProjectAuditList",
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
    component: BlankRouteNode,
    name: "ScheduleReport",
    redirect: {
      name: "ScheduleReportList",
    },
    children: [
      {
        path: "index",
        name: "ScheduleReportList",
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
    component: BlankRouteNode,
    name: "ScheduleSupervise",
    redirect: {
      name: "ScheduleSuperviseList",
    },
    children: [
      {
        path: "index",
        name: "ScheduleSuperviseList",
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
    component: BlankRouteNode,
    name: "ProjectAcceptance",
    redirect: {
      name: "ProjectAcceptanceList",
    },
    children: [
      {
        path: "index",
        name: "ProjectAcceptanceList",
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
    component: BlankRouteNode,
    name: "Setting",
    redirect: {
      name: "InfoSetting",
    },
    meta: { title: "系统管理", icon: "xitongguanli" },
    children: [
      {
        path: "/infoSetting",
        name: "InfoSetting",
        meta: { title: "信息库管理" },
        component: () => import("@/views/Setting/Info/index.vue"),
      },
      {
        path: "/userSetting",
        name: "UserSetting",
        meta: { title: "用户管理" },
        component: () => import("@/views/Setting/User/index.vue"),
      },
    ],
  },
  // 系统日志
  {
    path: "/logs",
    name: "Logs",
    component: () => import("@/views/Logs/index.vue"),
    meta: { title: "系统日志", icon: "xitongrizhi" },
  },
];
