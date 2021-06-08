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
        path: "/villageApplication/index",
        name: "VillageApplyList",
        noShowingChildren: true,
        meta: {
          title: "村庄申报",
          icon: "cunzhuangshenbao",
        },
        component: () => import("@/views/VillageApplication/index.vue"),
        children: [
          {
            path: "/villageApplication/newOrdinary",
            name: "newOrdinaryApplication",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "一般村申报",
            },
            component: () =>
              import("@/views/VillageApplication/New/Ordinary.vue"),
            children: [
              {
                path: "form",
                name: "newOrdinaryApplicationForm",
                meta: {
                  activeMenu: "/villageApplication/index",
                  title: "新建申报",
                },
                component: () =>
                  import("@/views/VillageApplication/NewForm/Ordinary.vue"),
              },
            ],
          },
          {
            path: "/villageApplication/newMajor",
            name: "newMajorApplication",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "重点村申报",
            },
            component: () => import("@/views/VillageApplication/New/Major.vue"),
            children: [
              {
                path: "form",
                name: "newMajorApplicationForm",
                meta: {
                  activeMenu: "/villageApplication/index",
                  title: "新建申报",
                },
                component: () =>
                  import("@/views/VillageApplication/NewForm/Major.vue"),
              },
            ],
          },
          {
            path: "/villageApplication/newPromote",
            name: "newPromoteApplication",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "提升",
            },
            component: () =>
              import("@/views/VillageApplication/New/Promote.vue"),
            children: [
              {
                path: "form",
                name: "newPromoteApplicationForm",
                meta: {
                  activeMenu: "/villageApplication/index",
                  title: "新建申报",
                },
                component: () =>
                  import("@/views/VillageApplication/NewForm/Promote.vue"),
              },
            ],
          },
          {
            path: "/villageApplication/declareList",
            name: "declareList",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "申报详情",
            },
            component: () =>
              import("@/views/VillageApplication/DeclareList/index.vue"),
            children: [
              {
                path: "detail",
                name: "declareDetail",
                meta: {
                  activeMenu: "/villageApplication/index",
                  title: "详情",
                },
                component: () =>
                  import("@/views/VillageApplication/Detail/index.vue"),
              },
            ],
          },
          {
            path: "/villageApplication/AuditList",
            name: "auditList",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "审核详情",
            },
            component: () =>
              import("@/views/VillageApplication/AuditList/index.vue"),
          },
          {
            path: "/villageApplication/Audit",
            name: "audit",
            meta: {
              activeMenu: "/villageApplication/index",
              title: "审核",
            },
            component: () =>
              import("@/views/VillageApplication/Audit/index.vue"),
            children: [
              {
                path: "detail",
                name: "auditDetail",
                meta: {
                  activeMenu: "/villageApplication/index",
                  title: "详情",
                },
                component: () =>
                  import("@/views/VillageApplication/Detail/index.vue"),
              },
            ],
          },
        ],
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
      {
        path: "/planAudit/verify/detail",
        name: "PlanAuditVerifyDetail",
        hidden: true,
        meta: {
          title: "审核详情",
          noCache: true,
          activeMenu: "/planAudit/index",
        },
        component: () => import("@/views/PlanAudit/VerifyDetail"),
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
      {
        path: "/projectApplication/save",
        name: "ProjectApplicationSave",
        hidden: true,
        meta: {
          title: "项目管理",
          noCache: true,
          activeMenu: "/projectApplication/index",
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
        },
        component: () => import("@/views/ProjectApplication/Detail"),
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
