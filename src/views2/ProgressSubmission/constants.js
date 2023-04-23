// 村庄类型列表
export const DECLEAR_TYPE = {
  1001: '一般村',
  1002: '重点村',
  1003: '提升',
};
// 村庄列表 一般村、重点村、提升 对应的路由名称
export const VILLAGE_LIST_ROUTER_NAME = {
  1001: 'newOrdinaryApplication',
  1002: 'newMajorApplication',
  1003: 'newPromoteApplication',
};

// 审核状态码
export const DECLEAR_STATUS = {
  // 0:市级未审核、1:市级审核不通过、2:省级未审核、3:省级审核不通过、4:审核通过
  0: '市级未审核',
  1: '市级审核不通过',
  2: '省级未审核',
  3: '省级审核不通过',
  4: '审核通过',
};
// 省级审核状态码
export const PRO_DECLEAR_STATUS = {
  2004: '省级未审核',
  2999: '省级已审核',
};

// 古建筑村落年代
export const VILLAGE_AGE = ['明代以前', '明代', '清代', '1912年-1949年', '1950年-1980年'];

// 古村落名称及相关对应字段
export const HISTORY_BUILDINGS = [
  { label: '古民宅', value: 'houseNum' },
  { label: '古祠堂', value: 'hallNum' },
  { label: '古戏台', value: 'stageNum' },
  { label: '古牌坊', value: 'archNum' },
  { label: '古桥', value: 'bridgeNum' },
  { label: '古道', value: 'roadNum' },
  { label: '古渠', value: 'canalNum' },
  { label: '古堰坝', value: 'barrageNum' },
  { label: '古井泉', value: 'wellNum' },
  { label: '古街巷', value: 'streetNum' },
  { label: '古会馆', value: 'guildNum' },
  { label: '古城堡', value: 'castleNum' },
  { label: '古塔', value: 'towerNum' },
  { label: '古寺庙', value: 'templeNum' },
  { label: '近现代建筑', value: 'modernBuildingNum' },
  { label: '特色建材', value: 'featureNum' },
  { label: '其他', value: 'other' },
];
// 本条项目状态（0本月待报送、1县级待审核、2本月已报送、3本月未报送、4本月报送超时、5已竣工）
// 11上半月待报送、13上半月已报送、14上半月未报送、15上半月报送超时、66已竣工 21下半月待报送、23下半月已报送、24下半月未报送、25下半月报送超时、66已竣工 、1县级待审核
export const PROJECT_STATUS = {
  TO_BE_FIRST_REPORT: 11, // 上半月待报送
  TO_BE_LATTER_REPORT: 21, // 下半月待报送
  TO_BE_REPORT: 0, // 本月待报送
  COUNTY_VERIFY_PENDING: 1, // 县级待审核
  CITY_VERIFY_PENDING: 7, // 市级待审核
  REPORTED: 2, // 本月已报送
  FIRST_REPORTED: 13, // 上半月已报送
  LATTER_REPORTED: 23, // 下半月已报送
  UNREPORTED: 3, // 本月未报送
  FIRST_UNREPORTED: 14, // 上半月未报送
  LATTER_UNREPORTED: 24, // 下半月未报送
  TIMEOUT_REPORTED: 4, // 本月报送超时
  FIRST_TIMEOUT_REPORTED: 15, // 上半月报送超时
  LATTER_TIMEOUT_REPORTED: 25, // 下半月报送超时
  COMPLETED: 5, // 已竣工
  NEW_COMPLETED: 66, // 新已竣工
};
// 项目状态: 状态码->文案
export const REPORT_STATUS = Object.freeze({
  11: '上半月待报送',
  21: '下半月待报送',
  1: '县级待审核',
  13: '上半月已报送',
  23: '下半月已报送',
  14: '上半月未报送',
  24: '下半月未报送',
  // 15: '上半月报送超时',
  // 25: '下半月报送超时',
  0: '本月待报送',
  // 1: '县级待审核',
  // 2: '本月已报送',
  // 3: '本月未报送',
  // 4: '本月报送超时',
  // 5: '已竣工',
  66: '已竣工',
});
// 11上半月待报送、13上半月已报送、14上半月未报送、15上半月报送超时、66已竣工 21下半月待报送、23下半月已报送、24下半月未报送、25下半月报送超时、66已竣工 、1县级待审核
export function getStatusName(status) {
  const statusList = {
    11: '上半月待报送',
    13: '上半月已报送',
    14: '上半月未报送',
    // 15: '上半月报送超时',
    21: '下半月待报送',
    23: '下半月已报送',
    24: '下半月未报送',
    // 25: '下半月报送超时',
    0: '本月待报送',
    1: '县级待审核',
    7: '市级待审核',
    2: '本月已报送',
    3: '本月未报送',
    4: '本月报送超时',
    5: '已竣工',
    66: '已竣工',
    '-1': '该批次报送已结束',
  };
  return statusList[status];
}
export const REPORT_STATUS_COLOR = Object.freeze({
  0: '#F7B500', //本月待报送
  11: '#F7B500', //上半月待报送
  21: '#F7B500', //下半月待报送
  1: '#E6A23C', // 县级待审核
  7: '#E6A23C', // 市级待审核
  2: '#67C23A', // 本月已报送
  13: '#67C23A', // 上半月已报送
  23: '#67C23A', // 下半月已报送
  3: '#FF6B00', // 本月未报送
  14: '#FF6B00', // 上半月未报送
  24: '#FF6B00', // 下半月未报送
  4: '#D40000', // 本月报送超时
  // 15: '#D40000', // 上半月报送超时
  // 25: '#D40000', // 下半月报送超时
  5: '#CCCCCC', // 已竣工
  66: '#CCCCCC', // 已竣工
  '-1': '#CCCCCC', // 该批次报送已结束
});
