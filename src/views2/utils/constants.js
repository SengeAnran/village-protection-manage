export const USER_TYPE = Object.freeze({
  PROVINCE: 1, // 省级
  CITY: 2, // 市级 当前市级角色合并为一个角色
  CITY_LEADER: 5, // 市级领导
  COUNTRY: 3, // 县级 当前县级与县级领导合并为一个角色
  COUNTRY_LEADER: 6, // 县级领导
  VILLAGE: 4, // 村级
});

// 审核状态。0未通过， 1通过, -1未处理
export const VERIFY_STATE = Object.freeze({
  PASSED: 1,
  REJECTED: 0,
  PENDING: -1,
});

// 最终审核状态
export const FINAL_STATUS = Object.freeze({
  //5县级待上报、0:市级未审核、1:市级已驳回、6市级待上报、2:省级未审核、3:省级已驳回、4:审核通过
  COUNTRY_REPORT_PENDING: 5,
  CITY_VERIFY_PENDING: 0,
  CITY_REPORT_PENDING: 6,
  CITY_VERIFY_REJECTED: 1,
  PROVINCE_VERIFY_PENDING: 2,
  PROVINCE_VERIFY_REJECTED: 3,
  PROVINCE_VERIFY_PASSED: 4,
});

// 最终审核状态: 状态码->文案
export const DECLARE_STATUS = Object.freeze({
  //0:市级未审核、1:市级已驳回、2:省级未审核、3:省级已驳回、4:审核通过 5县级待上报 6市级待上报
  5: '县级待上报',
  0: '市级未审核',
  6: '市级待上报',
  1: '市级已驳回',
  2: '省级未审核',
  3: '省级已驳回',
  4: '省级审核通过',
});

// 最终审核状态个状态对应的颜色值
export const FINAL_STATUE_COLOR = Object.freeze(['#E6A23C', '#F56C6C', '#E6A23C', '#F56C6C', '#67C23A', '#E6A23C', '#E6A23C'])

