import BlankRouteNode from './BlankRouteNode';
import { USER_TYPE } from '@/views2/utils/constants';

export const constantRoutes = [
  {
    name: 'notFound',
    path: '/404',
    component: () => import('../views/NotFound'),
  },
  {
    name: 'noAuth',
    path: '/noAuth',
    component: () => import('../views/NoAuth'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/home'),
  },
];

export const defaultRoutes = [
  // 村庄申报 / 村庄审核
  {
    path: '/villageApplication',
    component: BlankRouteNode,
    name: 'VillageApplication',
    redirect: {
      name: 'VillageApplyList',
    },
    meta: {
      menuIds: [3100, 3200],
      title: '村庄申报',
      hideChild: true,
      icon: 'cunzhuangshenbao',
    },
    children: [
      {
        path: '/villageApplication/index',
        name: 'VillageApplyList',
        meta: {
          icon: 'cunzhuangshenbao',
          menuIds: [310002, 320001],
        },
        component: () => import('@/views/VillageApplication/index.vue'),
      },
      {
        path: '/villageApplication/newOrdinary',
        name: 'newOrdinaryApplication',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '一般村申报',
          menuIds: [310001],
        },
        component: () => import('@/views/VillageApplication/New/Ordinary.vue'),
      },
      {
        path: '/villageApplication/newMajor',
        name: 'newMajorApplication',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '重点村申报',
          menuIds: [310001],
        },
        component: () => import('@/views/VillageApplication/New/Major.vue'),
      },
      {
        path: '/villageApplication/newPromote',
        name: 'newPromoteApplication',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '提升申报',
          menuIds: [310001],
        },
        component: () => import('@/views/VillageApplication/New/Promote.vue'),
      },
      {
        path: '/villageApplication/declareList',
        name: 'declareList',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '申报详情',
          menuIds: [310002, 320001],
        },
        component: () => import('@/views/VillageApplication/DeclareList/index.vue'),
      },
      {
        path: '/villageApplication/AuditList',
        name: 'auditList',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '审核详情',
          menuIds: [310002, 320001],
        },
        component: () => import('@/views/VillageApplication/AuditList/index.vue'),
      },
      {
        path: '/villageApplication/Audit',
        name: 'audit',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '审核',
          menuIds: [320002],
        },
        component: () => import('@/views/VillageApplication/Audit/index.vue'),
      },
      {
        path: 'villageDetail',
        name: 'villageDetail',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication/index',
          title: '详情',
          menuIds: [310002, 320001],
        },
        component: () => import('@/views/VillageApplication/Detail/index.vue'),
      },
    ],
  },
  // 规划评审
  {
    path: '/planAudit',
    component: BlankRouteNode,
    name: 'PlanAudit',
    redirect: {
      name: 'PlanAuditList',
    },
    meta: {
      menuIds: [3300],
      title: '规划评审',
      icon: 'guihuapingshen',
      hideChild: true,
    },
    children: [
      {
        path: 'index',
        name: 'PlanAuditList',
        meta: {
          icon: 'guihuapingshen',
          menuIds: [330001],
        },
        component: () => import('@/views/PlanAudit/index'),
      },
      {
        path: '/planAudit/save',
        name: 'PlanAuditSave',
        hidden: true,
        meta: {
          title: '评审',
          noCache: true,
          activeMenu: '/planAudit/index',
          menuIds: [330002],
        },
        component: () => import('@/views/PlanAudit/Save'),
      },
      {
        path: '/planAudit/detail',
        name: 'PlanAuditDetail',
        hidden: true,
        meta: {
          title: '评审详情',
          noCache: true,
          activeMenu: '/planAudit/index',
          menuIds: [330001],
        },
        component: () => import('@/views/PlanAudit/Detail'),
      },
      {
        path: '/planAudit/verify/detail',
        name: 'PlanAuditVerifyDetail',
        hidden: true,
        meta: {
          title: '审核详情',
          noCache: true,
          activeMenu: '/planAudit/index',
          menuIds: [330001],
        },
        component: () => import('@/views/PlanAudit/VerifyDetail'),
      },
      {
        path: '/planAudit/review',
        name: 'PlanAuditReview',
        hidden: true,
        meta: {
          title: '评审',
          noCache: true,
          activeMenu: '/planAudit/index',
          menuIds: [330003],
        },
        component: () => import('@/views/PlanAudit/Review'),
      },
    ],
  },
  // 项目申报 / 项目审核
  {
    path: '/projectApplication',
    component: BlankRouteNode,
    name: 'ProjectApply',
    redirect: {
      name: 'ProjectApplyList',
    },
    meta: {
      menuIds: [3400, 3500],
      title: '项目申报',
      icon: 'xiangmushenbao',
      hideChild: true,
    },
    children: [
      {
        path: 'index',
        name: 'ProjectApplyList',
        meta: {
          icon: 'xiangmushenbao',
          menuIds: [340002, 350001],
        },
        component: () => import('@/views/ProjectApplication/index.vue'),
      },
      {
        path: '/projectApplication/save',
        name: 'ProjectApplicationSave',
        hidden: true,
        meta: {
          title: '项目管理',
          noCache: true,
          activeMenu: '/projectApplication/index',
          menuIds: [340001, 340003],
        },
        component: () => import('@/views/ProjectApplication/Save'),
      },
      {
        path: '/projectApplication/detail',
        name: 'ProjectApplicationDetail',
        hidden: true,
        meta: {
          title: '项目详情',
          noCache: true,
          activeMenu: '/projectApplication/index',
          menuIds: [340002, 350001],
        },
        component: () => import('@/views/ProjectApplication/Detail'),
      },
      {
        path: '/projectApplication/verify/detail',
        name: 'ProjectApplicationVerifyDetail',
        hidden: true,
        meta: {
          title: '审核详情',
          noCache: true,
          activeMenu: '/projectApplication/index',
          // menuIds: [40002, 50001],
        },
        component: () => import('@/views/ProjectApplication/VerifyDetail'),
      },
    ],
  },
  // 进度上报 / 进度监管
  {
    path: '/scheduleReport',
    component: BlankRouteNode,
    name: 'ScheduleReport',
    redirect: {
      name: 'ScheduleReportList',
    },
    meta: {
      menuIds: [3600, 3700],
      title: '进度上报',
      icon: 'jindushangbao',
      hideChild: true,
    },
    children: [
      {
        path: 'index',
        name: 'ScheduleReportList',
        meta: {
          icon: 'jindushangbao',
          menuIds: [360002, 370001],
        },
        component: () => import('@/views/ScheduleReport/index'),
      },
      {
        path: '/scheduleReport/new',
        name: 'NewSchedule',
        hidden: true,
        meta: {
          title: '上报',
          icon: 'jindushangbao',
          activeMenu: '/scheduleReport/index',
          menuIds: [360001],
        },
        component: () => import('@/views/ScheduleReport/New/index.vue'),
      },
      {
        path: '/scheduleReport/detail',
        name: 'ScheduleDetail',
        hidden: true,
        meta: {
          title: '查看详情',
          icon: 'jindushangbao',
          activeMenu: '/scheduleReport/index',
          menuIds: [360002, 370001],
        },
        component: () => import('@/views/ScheduleReport/Detail/index.vue'),
      },
      {
        path: '/scheduleReport/history',
        name: 'HistorySchedule',
        hidden: true,
        meta: {
          title: '历史进度',
          icon: 'jindushangbao',
          activeMenu: '/scheduleReport/index',
          menuIds: [370001],
        },
        component: () => import('@/views/ScheduleReport/History/index.vue'),
      },
    ],
  },
  // 项目验收
  {
    path: '/projectAcceptance',
    component: BlankRouteNode,
    name: 'ProjectAcceptance',
    redirect: {
      name: 'ProjectAcceptanceList',
    },
    meta: {
      menuIds: [3800, 3102, 3103],
      title: '项目验收',
      icon: 'xiangmuyanshou',
      hideChild: true,
    },
    children: [
      {
        path: 'index',
        name: 'ProjectAcceptanceList',
        meta: {
          icon: 'xiangmuyanshou',
          menuIds: [380001, 310201, 310301],
        },
        component: () => import('@/views/ProjectAcceptance/index'),
      },
      {
        path: '/projectAcceptance/save',
        name: 'ProjectAcceptanceSave',
        hidden: true,
        meta: {
          title: '验收',
          noCache: true,
          activeMenu: '/projectAcceptance/index',
          menuIds: [380002, 310202, 310302],
        },
        component: () => import('@/views/ProjectAcceptance/Save'),
      },
      {
        path: '/projectAcceptance/verify/detail',
        name: 'ProjectAcceptanceVerifyDetail',
        hidden: true,
        meta: {
          title: '验收详情',
          noCache: true,
          activeMenu: '/projectAcceptance/index',
          menuIds: [380002, 310201, 310301],
        },
        component: () => import('@/views/ProjectAcceptance/VerifyDetail'),
      },
      {
        path: '/projectAcceptance/rectification/detail',
        name: 'ProjectRectificationDetail',
        hidden: true,
        meta: {
          title: '整改详情',
          noCache: true,
          activeMenu: '/projectAcceptance/index',
          // menuIds: [80002, 10201, 10301],
        },
        component: () => import('@/views/ProjectAcceptance/RectificationDetails'),
      },
    ],
  },
  // 政策查询
  {
    path: '/policyQuery',
    component: () => import('@/views/PolicyQuery/index.vue'),
    neme: 'PolicyQuery',
    meta: {
      title: '政策查询',
      icon: 'zhengcechaxun',
      menuIds: [310000],
    },
  },
  // 系统管理
  {
    path: '/setting',
    component: BlankRouteNode,
    name: 'Setting',
    redirect: {
      name: 'InfoSetting',
    },
    meta: {
      title: '系统管理',
      icon: 'xitongguanli',
      menuIds: [3900],
    },
    children: [
      {
        path: '/infoSetting',
        name: 'InfoSetting',
        meta: {
          title: '信息库管理',
          menuIds: [39001],
        },
        component: () => import('@/views/Setting/Info/index.vue'),
      },
      {
        path: '/statistics',
        name: 'Statistics',
        meta: {
          title: '数据统计',
          menuIds: [39003],
        },
        component: () => import('@/views/Setting/Statistics/index.vue'),
      },
      {
        path: '/userSetting',
        name: 'UserSetting',
        meta: {
          title: '用户管理',
          menuIds: [39002],
        },
        component: () => import('@/views/Setting/User/index.vue'),
      },
    ],
  },
  // 系统日志
  {
    path: '/systemLog',
    name: 'systemLog',
    meta: {
      title: '系统日志',
      icon: 'xitongrizhi',
      menuIds: [3101],
    },
    component: () => import('@/views/SystemLog/index.vue'),
  },
  // 政策文件管理
  {
    path: '/policyDocManage',
    component: () => import('@/views/PolicyDocManage/index.vue'),
    neme: 'PolicyDocManage',
    meta: {
      title: '政策文件管理',
      icon: 'zhengcewenjianguanli',
      menuIds: [3201],
    },
  },
];

export const defaultRoutes2 = [
  // 未来乡村
  // 首页
  {
    path: '/homePage',
    component: () => import('@/views2/HomePage/index'),
    name: 'HomePage',
    meta: {
      menuIds: [USER_TYPE.PROVINCE],
      title: '首页',
      hideChild: true,
      icon: 'shouye',
    },
  },
  // 村庄申报 / 村庄审核
  {
    path: '/villageApplication2',
    component: BlankRouteNode,
    name: 'VillageApplication2',
    redirect: {
      name: 'VillageApplyList2',
    },
    meta: {
      title: '未来乡村创建申报',
      hideChild: false,
      icon: 'cunzhuangshenbao',
      menuIds: [
        USER_TYPE.VILLAGE,
        USER_TYPE.COUNTRY,
        USER_TYPE.COUNTRY_LEADER,
        USER_TYPE.CITY,
        USER_TYPE.CITY_LEADER,
        USER_TYPE.PROVINCE,
      ],
    },
    children: [
      {
        path: '/villageApplication2/index',
        name: 'VillageApplyList2',
        meta: {
          title: '创建申报',
          menuIds: [USER_TYPE.VILLAGE, USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER],
        },
        component: () => import('@/views2/VillageApplication/index/index.vue'),
      },
      {
        path: '/villageApplication2/index',
        name: 'VillageApplyList2',
        meta: {
          title: '市级比选',
          menuIds: [USER_TYPE.CITY, USER_TYPE.CITY_LEADER],
        },
        component: () => import('@/views2/VillageApplication/index/index.vue'),
      },
      {
        path: '/villageApplication2/index',
        name: 'VillageApplyList2',
        meta: {
          title: '省级审核',
          menuIds: [USER_TYPE.PROVINCE],
        },
        component: () => import('@/views2/VillageApplication/index/index.vue'),
      },
      {
        path: '/villageApplication2/new',
        name: 'newApplication',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication2/index',
          menuIds: [],
        },
        component: () => import('@/views2/VillageApplication/New/index.vue'),
      },
      {
        path: '/villageApplication2/villageDetails',
        name: 'villageDetails',
        hidden: true,
        meta: {
          activeMenu: '/villageApplication2/index',
          title: '详情',
          menuIds: [],
        },
        component: () => import('@/views2/VillageApplication/Detail/index.vue'),
        props: (route) => ({ cityVerify: route.query.cityVerify || false }),
      },
    ],
  },
  // 进度申报
  {
    path: '/progressSubmission',
    component: BlankRouteNode,
    name: 'ProgressSubmission',
    redirect: {
      name: 'ProgressSubmissionList',
    },
    meta: {
      title: '项目进度报送',
      hideChild: false,
      icon: 'jindushangbao',
    },
    children: [
      {
        path: '/progressSubmission/index',
        name: 'ProgressSubmissionList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.VILLAGE],
          title: '项目报送',
        },
        component: () => import('@/views2/ProgressSubmission/index.vue'),
      },
      {
        path: '/progressSubmission/index',
        name: 'ProgressSubmissionList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER],
          title: '县级审核',
        },
        component: () => import('@/views2/ProgressSubmission/index.vue'),
      },
      {
        path: '/progressSubmission/projectScheduling/index',
        name: 'ProjectSchedulingList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [
            USER_TYPE.COUNTRY,
            USER_TYPE.COUNTRY_LEADER,
            USER_TYPE.CITY,
            USER_TYPE.CITY_LEADER,
            USER_TYPE.PROVINCE,
          ],
          title: '项目调度',
        },
        component: () => import('@/views2/ProgressSubmission/ProjectScheduling/index.vue'),
      },
      {
        path: '/progressSubmission/new',
        name: 'NewProgressSubmission',
        hidden: true,
        meta: {
          activeMenu: '/progressSubmission/index',
          title: '进度报送',
        },
        component: () => import('@/views2/ProgressSubmission/New/index'),
      },
      {
        path: '/progressSubmission/details',
        name: 'ProgressSubmissionDetails',
        hidden: true,
        meta: {
          activeMenu: '/progressSubmission/index',
          title: '详情',
        },
        component: () => import('@/views2/ProgressSubmission/Detail/index'),
      },
    ],
  },
  // 验收评价
  {
    path: '/acceptanceEvaluation',
    component: BlankRouteNode,
    name: 'AcceptanceEvaluation',
    redirect: {
      name: 'AcceptanceEvaluationList',
    },
    meta: {
      title: '验收评价',
      hideChild: false,
      icon: 'xiangmuyanshou',
      menuIds: [USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER, USER_TYPE.CITY, USER_TYPE.CITY_LEADER, USER_TYPE.PROVINCE],
    },
    children: [
      {
        path: '/acceptanceEvaluation/index',
        name: 'AcceptanceEvaluationList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.VILLAGE, USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER],
          title: '县级自评申报',
        },
        component: () => import('@/views2/AcceptanceEvaluation/index.vue'),
      },
      {
        path: '/acceptanceEvaluation/index',
        name: 'AcceptanceEvaluationList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.CITY, USER_TYPE.CITY_LEADER],
          title: '市级审核比选',
        },
        component: () => import('@/views2/AcceptanceEvaluation/index.vue'),
      },
      {
        path: '/acceptanceEvaluation/index',
        name: 'AcceptanceEvaluationList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.PROVINCE],
          title: '省级复核评价',
        },
        component: () => import('@/views2/AcceptanceEvaluation/index.vue'),
      },
      {
        path: '/acceptanceEvaluation/new',
        name: 'NewAcceptanceEvaluation',
        hidden: true,
        meta: {
          activeMenu: '/acceptanceEvaluation/index',
          title: '新增',
        },
        component: () => import('@/views2/AcceptanceEvaluation/New/index'),
      },
      {
        path: '/acceptanceEvaluation/details',
        name: 'AcceptanceEvaluationDetails',
        hidden: true,
        meta: {
          activeMenu: '/acceptanceEvaluation/index',
          title: '详情',
        },
        component: () => import('@/views2/AcceptanceEvaluation/Detail/index'),
      },
    ],
  },
  {
    path: '/villageApplicationConfig2',
    component: BlankRouteNode,
    name: 'villageApplicationConfig2',
    redirect: {
      name: 'DeclarationBatch',
    },
    meta: {
      menuIds: [USER_TYPE.PROVINCE],
      title: '申报配置',
      hideChild: false,
      icon: 'xiangmuyanshou',
    },
    children: [
      {
        path: '/villageApplication2/declarationBatch',
        name: 'DeclarationBatch',
        hidden: false,
        meta: {
          // activeMenu: "/acceptanceEvaluation/index",
          title: '创建批次配置',
          menuIds: [USER_TYPE.PROVINCE],
        },
        component: () => import('@/views2/VillageApplication/DeclarationBatch/index'),
      },
      {
        path: '/villageApplication2/ProjectSchedulConfig',
        name: 'DeclarationBatch',
        hidden: false,
        meta: {
          // activeMenu: "/acceptanceEvaluation/index",
          title: '项目调度配置',
          menuIds: [USER_TYPE.PROVINCE],
        },
        component: () => import('@/views2/ProgressSubmission/ProjectSchedulConfig/index'),
      },
      {
        path: '/villageApplication2/applicationQuota',
        name: 'ApplicationQuota',
        hidden: false,
        meta: {
          // activeMenu: "/acceptanceEvaluation/index",
          title: '申报名额配置',
          menuIds: [USER_TYPE.PROVINCE],
        },
        component: () => import('@/views2/VillageApplication/ApplicationQuota/index'),
      },
      {
        path: '/acceptanceEvaluation/acceptanceTime',
        name: 'AcceptanceTime',
        hidden: false,
        meta: {
          // activeMenu: "/acceptanceEvaluation/index",
          title: '审批比选时间配置',
          menuIds: [USER_TYPE.PROVINCE],
        },
        component: () => import('@/views2/AcceptanceEvaluation/AcceptanceTime/index'),
      },
    ],
  },
  // 驾驶舱进度
  {
    path: '/cockpitProgress',
    component: BlankRouteNode,
    name: 'CockpitProgress',
    redirect: {
      name: 'CockpitProgressList',
    },
    meta: {
      menuIds: [USER_TYPE.PROVINCE, USER_TYPE.CITY, USER_TYPE.CITY_LEADER, USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER],
      title: '驾驶舱进度',
      hideChild: false,
      icon: 'xiangmuyanshou',
    },
    children: [
      {
        path: '/cockpitProgress/index',
        name: 'CockpitProgressList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.COUNTRY, USER_TYPE.COUNTRY_LEADER],
          title: '县级初审',
        },
        component: () => import('@/views2/CockpitProgress/index.vue'),
      },
      {
        path: '/cockpitProgress/index',
        name: 'CockpitProgressList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.CITY, USER_TYPE.CITY_LEADER],
          title: '市级中审',
        },
        component: () => import('@/views2/CockpitProgress/index.vue'),
      },
      {
        path: '/cockpitProgress/index',
        name: 'CockpitProgressList',
        meta: {
          // icon: "cunzhuangshenbao",
          menuIds: [USER_TYPE.PROVINCE],
          title: '省级终审',
        },
        component: () => import('@/views2/CockpitProgress/index.vue'),
      },
    ],
  },
];
export const defaultRoutes3 = [
  // 未来乡村微信小程序
  // 邻里互助
  {
    path: '/neighborhoodMutualAid',
    component: BlankRouteNode,
    name: 'NeighborhoodMutualAid',
    redirect: {
      name: 'NeighborhoodMutualAidList',
    },
    meta: {
      menuIds: [100],
      title: '邻里互助',
      hideChild: true,
      icon: 'linlihuzhu',
    },
    children: [
      {
        path: '/neighborhoodMutualAid/index',
        name: 'NeighborhoodMutualAidList',
        meta: {
          icon: 'cunzhuangshenbao',
        },
        component: () => import('@/views3/NeighborhoodMutualAid/index.vue'),
      },
    ],
  },
  // 场馆预约
  {
    path: '/venueReservation',
    component: BlankRouteNode,
    name: 'VenueReservation',
    redirect: {
      name: 'VenueReservationList',
    },
    meta: {
      menuIds: [101],
      title: '场馆预约',
      hideChild: true,
      icon: 'changguanyuyue',
    },
    children: [
      {
        path: '/venueReservation/index',
        name: 'VenueReservationList',
        meta: {
          icon: 'cunzhuangshenbao',
          menuIds: [10101],
        },
        component: () => import('@/views3/VenueReservation/index.vue'),
      },
      {
        path: '/venueReservation/new',
        name: 'newVenueReservation',
        hidden: true,
        meta: {
          activeMenu: '/venueReservation/index',
          // menuIds: [990099],
        },
        component: () => import('@/views3/VenueReservation/New/index.vue'),
      },
      {
        path: '/venueReservation/detail',
        name: 'venueReservationDetails',
        hidden: true,
        meta: {
          activeMenu: '/venueReservation/index',
          title: '详情',
          // menuIds: [10002, 1980099],
        },
        component: () => import('@/views3/VenueReservation/Detail/index.vue'),
      },
    ],
  },
  // 网上议事
  {
    path: '/onlineMeeting',
    component: BlankRouteNode,
    name: 'OnlineMeeting',
    redirect: {
      name: 'OnlineMeetingList',
    },
    meta: {
      menuIds: [102],
      title: '网上议事',
      hideChild: true,
      icon: 'wangshangyishi',
    },
    children: [
      {
        path: '/onlineMeeting/index',
        name: 'OnlineMeetingList',
        meta: {
          icon: 'cunzhuangshenbao',
          // menuIds: [10002, 1980099],
        },
        component: () => import('@/views3/OnlineMeeting/index.vue'),
      },
      {
        path: '/onlineMeeting/new',
        name: 'newOnlineMeeting',
        hidden: true,
        meta: {
          activeMenu: '/onlineMeeting/index',
          title: '发起议事',
          // menuIds: [990099],
        },
        component: () => import('@/views3/OnlineMeeting/New/index.vue'),
      },
      {
        path: '/onlineMeeting/detail',
        name: 'onlineMeetingDetails',
        hidden: true,
        meta: {
          activeMenu: '/onlineMeeting/index',
          title: '详情',
          // menuIds: [10002, 1980099],
        },
        component: () => import('@/views3/OnlineMeeting/Detail/index.vue'),
      },
    ],
  },
];
