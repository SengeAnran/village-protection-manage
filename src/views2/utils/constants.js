export const USER_TYPE = {
  PROVINCE: 1, // 省级
  CITY: 2, // 市级
  CITY_LEADER: 5, // 市级领导
  COUNTRY: 3, // 县级
  COUNTRY_LEADER: 6, // 县级领到
};

// 审核状态。0未通过， 1通过, -1未处理
export const VERIFY_STATE = {
  PASSED: 1,
  REJECTED: 0,
  PENDING: -1,
};

// 最终审核状态	
export const FINAL_STATUS = {
  //5县级待上报、0:市级未审核、1:市级已驳回、6市级待上报、2:省级未审核、3:省级已驳回、4:审核通过
  COUNTRY_REPORT_PENDING: 5,
  CITY_VERIFY_PENDING: 0,
  CITY_REPORT_PENDING: 6,
  CITY_VERIFY_REJECTED: 1,
  PROVINCE_VERIFY_PENDING: 2,
  PROVINCE_VERIFY_REJECTED: 3,
  PROVINCE_VERIFY_PASSED: 4,
};
