import { FINAL_STATUS, USER_TYPE } from '@/views2/utils/constants';
import _ from 'lodash';
// 排序
function canSort(data, roleId) {
  const { finalStatus: declareStatus } = data;
  if (
    ((roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER) && declareStatus === FINAL_STATUS.COUNTRY_REPORT_PENDING) ||
    ((roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) && declareStatus === FINAL_STATUS.CITY_REPORT_PENDING)
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
  if (roleId === USER_TYPE.CITY_LEADER || roleId === USER_TYPE.COUNTRY_LEADER) {
    return false;
  }
  return canModify(data, roleId);
}

// 审核详情
function canViewDeclare(data, roleId) {
  const { finalStatus: declareStatus } = data;
  if (roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER) {
    return true;
  } else if (roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER) {
    return declareStatus !== FINAL_STATUS.CITY_VERIFY_PENDING;
  } else if (roleId === USER_TYPE.PROVINCE) {
    return declareStatus === FINAL_STATUS.PROVINCE_VERIFY_PASSED || declareStatus === FINAL_STATUS.PROVINCE_VERIFY_REJECTED;
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

export const XIANJI_ACTION = {
  修改: (declareStatus) => canModify(declareStatus, 3),
  删除: (declareStatus) => canDelete(declareStatus, 3),
  详情: (declareStatus) => canViewDeclare(declareStatus, 3),
  排序: (declareStatus) => canSort(declareStatus, 3),
};
export const SHIJI_ACTION = {
  修改: (declareStatus) => canModify(declareStatus, 2),
  审核: (declareStatus) => canDeclare(declareStatus, 2),
  详情: (declareStatus) => canViewDeclare(declareStatus, 2),
  排序: (declareStatus) => canSort(declareStatus, 2),
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
