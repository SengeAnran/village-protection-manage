import BlankRouteNode from "./BlankRouteNode";

export const constantRoutes = [
  {
    name: "notFound",
    path: "/404",
    component: () => import("../views/NotFound"),
  },
  {
    name: "noAuth",
    path: "/noAuth",
    component: () => import("../views/NoAuth"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/home"),
  },
];

export const defaultRoutes = [
  // 历史文化
  // 村庄申报 / 村庄审核
  {
    path: "/villageApplication",
    component: BlankRouteNode,
    name: "VillageApplication",
    redirect: {
      name: "VillageApplyList",
    },
    meta: {
      menuIds: [9900, 19800],
      title: "村庄申报",
      hideChild: true,
      icon: "cunzhuangshenbao",
    },
    children: [
      {
        path: "/villageApplication/index",
        name: "VillageApplyList",
        meta: {
          icon: "cunzhuangshenbao",
          menuIds: [990099, 990198, 1980099],
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
          menuIds: [990099],
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
          menuIds: [990099],
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
          menuIds: [990099],
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
          menuIds: [990099, 1980099],
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
          menuIds: [990099, 1980099],
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
          menuIds: [1980198],
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
          menuIds: [990099, 1980099],
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
      menuIds: [29700],
      title: "规划评审",
      icon: "guihuapingshen",
      hideChild: true,
    },
    children: [
      {
        path: "index",
        name: "PlanAuditList",
        meta: {
          icon: "guihuapingshen",
          menuIds: [2970099],
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
          menuIds: [2970198],
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
          menuIds: [2970099],
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
          menuIds: [2970099],
        },
        component: () => import("@/views/PlanAudit/VerifyDetail"),
      },
      {
        path: "/planAudit/review",
        name: "PlanAuditReview",
        hidden: true,
        meta: {
          title: "评审",
          noCache: true,
          activeMenu: "/planAudit/index",
          menuIds: [2970297],
        },
        component: () => import("@/views/PlanAudit/Review"),
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
      menuIds: [39600, 49500],
      title: "项目申报",
      icon: "xiangmushenbao",
      hideChild: true,
    },
    children: [
      {
        path: "index",
        name: "ProjectApplyList",
        meta: {
          icon: "xiangmushenbao",
          menuIds: [3960198, 4950099],
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
          menuIds: [3960099, 3960297],
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
          menuIds: [3960198, 4950099],
        },
        component: () => import("@/views/ProjectApplication/Detail"),
      },
      {
        path: "/projectApplication/verify/detail",
        name: "ProjectApplicationVerifyDetail",
        hidden: true,
        meta: {
          title: "审核详情",
          noCache: true,
          activeMenu: "/projectApplication/index",
          // menuIds: [3960198, 4950099],
        },
        component: () => import("@/views/ProjectApplication/VerifyDetail"),
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
      menuIds: [59400, 69300],
      title: "进度上报",
      icon: "jindushangbao",
      hideChild: true,
    },
    children: [
      {
        path: "index",
        name: "ScheduleReportList",
        meta: {
          icon: "jindushangbao",
          menuIds: [5940198, 6930099],
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
          menuIds: [5940099],
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
          menuIds: [5940198, 6930099],
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
          menuIds: [6930099],
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
      menuIds: [79200, 10098, 10197],
      title: "项目验收",
      icon: "xiangmuyanshou",
      hideChild: true,
    },
    children: [
      {
        path: "index",
        name: "ProjectAcceptanceList",
        meta: {
          icon: "xiangmuyanshou",
          menuIds: [7920099, 1009899, 1019799],
        },
        component: () => import("@/views/ProjectAcceptance/index"),
      },
      {
        path: "/projectAcceptance/save",
        name: "ProjectAcceptanceSave",
        hidden: true,
        meta: {
          title: "验收",
          noCache: true,
          activeMenu: "/projectAcceptance/index",
          menuIds: [7920198, 1009998, 1019898],
        },
        component: () => import("@/views/ProjectAcceptance/Save"),
      },
      {
        path: "/projectAcceptance/verify/detail",
        name: "ProjectAcceptanceVerifyDetail",
        hidden: true,
        meta: {
          title: "验收详情",
          noCache: true,
          activeMenu: "/projectAcceptance/index",
          menuIds: [7920198, 1009899, 1019799],
        },
        component: () => import("@/views/ProjectAcceptance/VerifyDetail"),
      },
      {
        path: "/projectAcceptance/rectification/detail",
        name: "ProjectRectificationDetail",
        hidden: true,
        meta: {
          title: "整改详情",
          noCache: true,
          activeMenu: "/projectAcceptance/index",
          // menuIds: [7920198, 1009899, 1019799],
        },
        component: () => import("@/views/ProjectAcceptance/RectificationDetails"),
      },
    ],
  },
  // 政策查询
  {
    path: "/policyQuery",
    component: () => import("@/views/PolicyQuery/index.vue"),
    name: "PolicyQuery",
    meta: {
      title: "政策查询",
      icon: "zhengcechaxun",
      menuIds: [990000],
    },
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
      menuIds: [89100],
    },
    children: [
      {
        path: "/infoSetting",
        name: "InfoSetting",
        meta: {
          title: "信息库管理",
          menuIds: [891099],
        },
        component: () => import("@/views/Setting/Info/index.vue"),
      },
      {
        path: "/statistics",
        name: "Statistics",
        meta: {
          title: "数据统计",
          menuIds: [891297],
        },
        component: () => import("@/views/Setting/Statistics/index.vue"),
      },
      {
        path: "/userSetting",
        name: "UserSetting",
        meta: {
          title: "用户管理",
          menuIds: [891198],
        },
        component: () => import("@/views/Setting/User/index.vue"),
      },
    ],
  },
  // 系统日志
  {
    path: "/systçemLog",
    name: "systemLog",
    meta: {
      title: "系统日志",
      icon: "xitongrizhi",
      menuIds: [9999],
    },
    component: () => import("@/views/SystemLog/index.vue"),
  },
  // 政策文件管理
  {
    path: "/policyDocManage",
    component: () => import("@/views/PolicyDocManage/index.vue"),
    neme: "PolicyDocManage",
    meta: {
      title: "政策文件管理",
      icon: "zhengcewenjianguanli",
      menuIds: [19899],
    },
  },
];


export const defaultRoutes2 = [
  // 未来乡村
  // 村庄申报 / 村庄审核
  {
    path: "/villageApplication2",
    component: BlankRouteNode,
    name: "VillageApplication2",
    redirect: {
      name: "VillageApplyList2",
    },
    meta: {
      menuIds: [100, 200],
      title: "村庄申报1",
      hideChild: true,
      icon: "cunzhuangshenbao",
    },
    children: [
      {
        path: "/villageApplication2/index",
        name: "VillageApplyList2",
        meta: {
          icon: "cunzhuangshenbao",
          menuIds: [990099, 1980099],
        },
        component: () => import("@/views2/VillageApplication/index.vue"),
      },
      {
        path: "/villageApplication2/new",
        name: "newApplication",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication2/index",
          menuIds: [990099],
        },
        component: () => import("@/views2/VillageApplication/New/index.vue"),
      },
      {
        path: "/villageApplication2/villageDetails",
        name: "villageDetails",
        hidden: true,
        meta: {
          activeMenu: "/villageApplication2/index",
          title: "详情",
          menuIds: [990099, 1980099],
        },
        component: () => import("@/views2/VillageApplication/Detail/index.vue"),
      },
    ],
  },
];
export const defaultRoutes3 = [
  // 未来乡村微信小程序
  // 邻里互助
  {
    path: "/neighborhoodMutualAid",
    component: BlankRouteNode,
    name: "NeighborhoodMutualAid",
    redirect: {
      name: "NeighborhoodMutualAidList",
    },
    meta: {
      menuIds: [100],
      title: "邻里互助",
      hideChild: true,
      icon: "linlihuzhu",
    },
    children: [
      {
        path: "/neighborhoodMutualAid/index",
        name: "NeighborhoodMutualAidList",
        meta: {
          icon: "cunzhuangshenbao",
        },
        component: () => import("@/views3/NeighborhoodMutualAid/index.vue"),
      },
    ],
  },
  // 场馆预约
  {
    path: "/venueReservation",
    component: BlankRouteNode,
    name: "VenueReservation",
    redirect: {
      name: "VenueReservationList",
    },
    meta: {
      menuIds: [101],
      title: "场馆预约",
      hideChild: true,
      icon: "changguanyuyue",
    },
    children: [
      {
        path: "/venueReservation/index",
        name: "VenueReservationList",
        meta: {
          icon: "cunzhuangshenbao",
          menuIds: [10101],
        },
        component: () => import("@/views3/VenueReservation/index.vue"),
      },
      {
        path: "/venueReservation/new",
        name: "newVenueReservation",
        hidden: true,
        meta: {
          activeMenu: "/venueReservation/index",
          // menuIds: [990099],
        },
        component: () => import("@/views3/VenueReservation/New/index.vue"),
      },
      {
        path: "/venueReservation/detail",
        name: "venueReservationDetails",
        hidden: true,
        meta: {
          activeMenu: "/venueReservation/index",
          title: "详情",
          // menuIds: [10002, 1980099],
        },
        component: () => import("@/views3/VenueReservation/Detail/index.vue"),
      },
    ],
  },
  // 网上议事
  {
    path: "/onlineMeeting",
    component: BlankRouteNode,
    name: "OnlineMeeting",
    redirect: {
      name: "OnlineMeetingList",
    },
    meta: {
      menuIds: [102],
      title: "网上议事",
      hideChild: true,
      icon: "wangshangyishi",
    },
    children: [
      {
        path: "/onlineMeeting/index",
        name: "OnlineMeetingList",
        meta: {
          icon: "cunzhuangshenbao",
          // menuIds: [10002, 1980099],
        },
        component: () => import("@/views3/OnlineMeeting/index.vue"),
      },
      {
        path: "/onlineMeeting/new",
        name: "newOnlineMeeting",
        hidden: true,
        meta: {
          activeMenu: "/onlineMeeting/index",
          title: "发起议事",
          // menuIds: [990099],
        },
        component: () => import("@/views3/OnlineMeeting/New/index.vue"),
      },
      {
        path: "/onlineMeeting/detail",
        name: "onlineMeetingDetails",
        hidden: true,
        meta: {
          activeMenu: "/onlineMeeting/index",
          title: "详情",
          // menuIds: [10002, 1980099],
        },
        component: () => import("@/views3/OnlineMeeting/Detail/index.vue"),
      },
    ],
  },
];
