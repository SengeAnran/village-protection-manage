import { FINAL_STATUS, USER_TYPE } from '@/views2/utils/constants';
import _ from 'lodash';
// 排序
function canSort(data, roleId) {
  const { finalStatus: declareStatus } = data;
  if (
    ((roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER) &&
      declareStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING) ||
    ((roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) &&
      declareStatus === FINAL_STATUS.CITY_REPORT_PENDING)
  ) {
    return true;
  }
  return false;
}

// 修改 *******
function canModify(data, roleId) {
  const { finalStatus: declareStatus, rejectType } = data;
  if (roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) {
    return (
      declareStatus === FINAL_STATUS.CITY_REPORT_PENDING ||
      (rejectType === 2 && declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED)
    );
  } else if (roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER) {
    // 去除列表村级修改 || roleId === USER_TYPE.VILLAGE
    return (
      declareStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING ||
      declareStatus === FINAL_STATUS.CITY_VERIFY_REJECTED ||
      (declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED && rejectType === 1)
    );
  }
  return false;
}

// 删除 *******
function canDelete(data, roleId) {
  if (roleId !== USER_TYPE.COUNTRY && roleId !== USER_TYPE.COUNTRY_LEADER && roleId !== USER_TYPE.VILLAGE) {
    return false;
  }
  // return canModify(data, roleId);
  // fix: 删除按钮的权限与 修改权限解绑
  const { finalStatus: declareStatus, rejectType } = data;
  if (roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) {
    return (
      declareStatus === FINAL_STATUS.CITY_REPORT_PENDING ||
      (rejectType === 2 && declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED)
    );
  } else if (roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER || roleId === USER_TYPE.VILLAGE) {
    return (
      declareStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING ||
      declareStatus === FINAL_STATUS.CITY_VERIFY_REJECTED ||
      (declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED && rejectType === 1)
    );
  }
  return false;
}

// 审核详情
function canViewDeclare(data, roleId) {
  const { finalStatus: declareStatus } = data;
  if (roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER || roleId === USER_TYPE.VILLAGE) {
    return true;
  } else if (roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) {
    return declareStatus !== FINAL_STATUS.CITY_VERIFY_PENDING;
  } else if (roleId === USER_TYPE.PROVINCE) {
    return (
      declareStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED || declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED
    );
  }
  return false;
}

// 审核
function canDeclare(data, roleId) {
  const { finalStatus: declareStatus } = data;
  if (roleId === USER_TYPE.CITY) {
    return declareStatus === FINAL_STATUS.CITY_VERIFY_PENDING;
  } else if (roleId === USER_TYPE.PROVINCE) {
    return declareStatus === FINAL_STATUS.PROVINCE_VERIFY_PENDING;
  }
  return false;
}

export const CUNJI_ACTION = {
  修改: (declareStatus) => canModify(declareStatus, USER_TYPE.VILLAGE),
  删除: (declareStatus) => canDelete(declareStatus, USER_TYPE.VILLAGE),
  详情: (declareStatus) => canViewDeclare(declareStatus, USER_TYPE.VILLAGE),
};

export const XIANJI_ACTION = {
  审阅: (declareStatus) =>
    canModify(declareStatus, USER_TYPE.COUNTRY) || canModify(declareStatus, USER_TYPE.COUNTRY_LEADER),
  删除: (declareStatus) =>
    canDelete(declareStatus, USER_TYPE.COUNTRY) || canDelete(declareStatus, USER_TYPE.COUNTRY_LEADER),
  详情: (declareStatus) =>
    canViewDeclare(declareStatus, USER_TYPE.COUNTRY) || canViewDeclare(declareStatus, USER_TYPE.COUNTRY_LEADER),
  排序: (declareStatus) =>
    canSort(declareStatus, USER_TYPE.COUNTRY) || canSort(declareStatus, USER_TYPE.COUNTRY_LEADER),
};
export const SHIJI_ACTION = {
  修改: (declareStatus) => canModify(declareStatus, USER_TYPE.CITY) || canModify(declareStatus, USER_TYPE.CITY_LEADER),
  审核: (declareStatus) =>
    canDeclare(declareStatus, USER_TYPE.CITY) || canDeclare(declareStatus, USER_TYPE.CITY_LEADER),
  详情: (declareStatus) =>
    canViewDeclare(declareStatus, USER_TYPE.CITY) || canViewDeclare(declareStatus, USER_TYPE.CITY_LEADER),
  排序: (declareStatus) => canSort(declareStatus, USER_TYPE.CITY) || canSort(declareStatus, USER_TYPE.CITY_LEADER),
};
export const ADMIN_ACTION = {
  审核: (declareStatus) => canDeclare(declareStatus, 1),
  详情: (declareStatus) => canViewDeclare(declareStatus, 1),
};

/**
 * 同一批次下的推荐次序不重复即可
 * @param {Array} list checked list
 * @returns true: valid; false: others,
 */
export function checkCountryUnifiedReport(list) {
  const r = (list || []).some((i) => !Number(i.countrySortNum));
  if (r) {
    return false;
  }
  const grouped = _.groupBy(list || [], 'declarationBatch');
  return Object.values(grouped).every((arr) => {
    const dest = arr.map((i) => i.countrySortNum).sort();
    const unied = _.uniq(dest);
    return dest.length === unied.length;
  });
}
/**
 * 同一批次下的推荐次序不重复即可
 * @param {Array} list checked list
 * @returns true: valid; false: others,
 */
export function checkCityUnifiedReport(list) {
  const r = (list || []).some((i) => !Number(i.citySortNum));
  if (r) {
    return false;
  }
  const grouped = _.groupBy(list, 'declarationBatch');
  return Object.values(grouped).every((arr) => {
    const dest = arr.map((i) => i.citySortNum).sort();
    const unied = _.uniq(dest);
    return dest.length === unied.length;
  });
}
