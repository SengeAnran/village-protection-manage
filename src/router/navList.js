import BlankRouteNode from "./BlankRouteNode";

export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
];

export const defaultRoutes = [
  // 村庄申报 / 村庄审核
  {
    path: "/villageApplication",
    component: BlankRouteNode,
    name: "VillageApplication",
    redirect: {
      name: "VillageApplyList",
    },
    meta: {
      menuIds: [100, 200],
    },
    children: [
      {
        path: "/villageApplication/index",
        name: "VillageApplyList",
        meta: {
          title: "村庄申报",
          icon: "cunzhuangshenbao",
          menuIds: [10002, 20001],
        },
        component: () => import("@/views/VillageApplication/index.vue"),
      },
      {
        path: "/villageApplication/newOrdinary",
        name: "newOrdinaryApplication",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "一般村申报",
          menuIds: [10001],
        },
        component: () => import("@/views/VillageApplication/New/Ordinary.vue"),
      },
      {
        path: "/villageApplication/newMajor",
        name: "newMajorApplication",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "重点村申报",
          menuIds: [10001],
        },
        component: () => import("@/views/VillageApplication/New/Major.vue"),
      },
      {
        path: "/villageApplication/newPromote",
        name: "newPromoteApplication",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "提升申报",
          menuIds: [10001],
        },
        component: () => import("@/views/VillageApplication/New/Promote.vue"),
      },
      {
        path: "/villageApplication/declareList",
        name: "declareList",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "申报详情",
          menuIds: [10002],
        },
        component: () =>
          import("@/views/VillageApplication/DeclareList/index.vue"),
      },
      {
        path: "/villageApplication/AuditList",
        name: "auditList",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "审核详情",
          menuIds: [20001],
        },
        component: () =>
          import("@/views/VillageApplication/AuditList/index.vue"),
      },
      {
        path: "/villageApplication/Audit",
        name: "audit",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "审核",
          menuIds: [20002],
        },
        component: () => import("@/views/VillageApplication/Audit/index.vue"),
      },
      {
        path: "villageDetail",
        name: "villageDetail",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication/index",
          title: "详情",
          menuIds: [10002],
        },
        component: () => import("@/views/VillageApplication/Detail/index.vue"),
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
    meta: {
      menuIds: [300],
    },
    children: [
      {
        path: "index",
        name: "PlanAuditList",
        meta: {
          title: "规划评审",
          icon: "guihuapingshen",
          menuIds: [30001],
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
          menuIds: [30002],
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
          menuIds: [30001],
        },
        component: () => import("@/views/PlanAudit/Detail"),
      },
    ],
  },
  // 项目申报 / 项目审核
  {
    path: "/projectApplication",
    component: BlankRouteNode,
    name: "ProjectApply",
    redirect: {
      name: "ProjectApplyList",
    },
    meta: {
      menuIds: [400, 500],
    },
    children: [
      {
        path: "index",
        name: "ProjectApplyList",
        meta: {
          title: "项目申报",
          icon: "xiangmushenbao",
          menuIds: [40002, 50001],
        },
        component: () => import("@/views/ProjectApplication/index.vue"),
      },
      {
        path: "/projectApplication/save",
        name: "ProjectApplicationSave",
        hidden: true,
        meta: {
          title: "项目管理",
          noCache: true,
          activeMenu: "/projectApplication/index",
          menuIds: [40001, 40003],
        },
        component: () => import("@/views/ProjectApplication/Save"),
      },
      {
        path: "/projectApplication/detail",
        name: "ProjectApplicationDetail",
        hidden: true,
        meta: {
          title: "项目详情",
          noCache: true,
          activeMenu: "/projectApplication/index",
          menuIds: [40002, 50001],
        },
        component: () => import("@/views/ProjectApplication/Detail"),
      },
    ],
  },
  // 进度上报 / 进度监管
  {
    path: "/scheduleReport",
    component: BlankRouteNode,
    name: "ScheduleReport",
    redirect: {
      name: "ScheduleReportList",
    },
    meta: {
      menuIds: [600, 700],
    },
    children: [
      {
        path: "index",
        name: "ScheduleReportList",
        meta: {
          title: "进度上报",
          icon: "jindushangbao",
          menuIds: [60002, 70001],
        },
        component: () => import("@/views/ScheduleReport/index"),
      },
      {
        path: "/scheduleReport/new",
        name: "NewSchedule",
        hidden: true,
        meta: {
          title: "上报",
          icon: "jindushangbao",
          activeMenu: "/scheduleReport/index",
        },
        component: () => import("@/views/ScheduleReport/New/index.vue"),
      },
      {
        path: "/scheduleReport/detail",
        name: "ScheduleDetail",
        hidden: true,
        meta: {
          title: "查看详情",
          icon: "jindushangbao",
          activeMenu: "/scheduleReport/index",
        },
        component: () => import("@/views/ScheduleReport/Detail/index.vue"),
      },
      {
        path: "/scheduleReport/history",
        name: "HistorySchedule",
        hidden: true,
        meta: {
          title: "历史进度",
          icon: "jindushangbao",
          activeMenu: "/scheduleReport/index",
        },
        component: () => import("@/views/ScheduleReport/History/index.vue"),
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
    meta: {
      menuIds: [800],
    },
    children: [
      {
        path: "index",
        name: "ProjectAcceptanceList",
        meta: {
          title: "项目验收",
          icon: "xiangmuyanshou",
          menuIds: [80001],
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
    meta: {
      title: "系统管理",
      icon: "xitongguanli",
      menuIds: [900],
    },
    children: [
      {
        path: "/infoSetting",
        name: "InfoSetting",
        meta: {
          title: "信息库管理",
          menuIds: [9001],
        },
        component: () => import("@/views/Setting/Info/index.vue"),
      },
      {
        path: "/userSetting",
        name: "UserSetting",
        meta: {
          title: "用户管理",
          menuIds: [9002],
        },
        component: () => import("@/views/Setting/User/index.vue"),
      },
    ],
  },
  // 系统日志
  {
    path: "/logs",
    name: "Logs",
    component: () => import("@/views/Logs/index.vue"),
    meta: {
      title: "系统日志",
      icon: "xitongrizhi",
      menuIds: [101],
    },
  },
];
