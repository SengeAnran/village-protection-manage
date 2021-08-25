// 村庄类型列表
export const DECLEAR_TYPE = {
  1001: "一般村",
  1002: "重点村",
  1003: "提升",
};
// 村庄列表 一般村、重点村、提升 对应的路由名称
export const VILLAGE_LIST_ROUTER_NAME = {
  1001: "newOrdinaryApplication",
  1002: "newMajorApplication",
  1003: "newPromoteApplication",
};

// 审核状态码
export const DECLEAR_STATUS = {
  2001: "市级未审核",
  2004: "省级未审核",
  2999: "省级已审核",
};

// 古建筑村落年代
export const VILLAGE_AGE = [
  "明代以前",
  "明代",
  "清代",
  "1912年-1949年",
  "1950年-1980年",
];

// 古村落名称及相关对应字段
export const HISTORY_BUILDINGS = [
  { label: "古民宅", value: "houseNum" },
  { label: "古祠堂", value: "hallNum" },
  { label: "古戏台", value: "stageNum" },
  { label: "古牌坊", value: "archNum" },
  { label: "古桥", value: "bridgeNum" },
  { label: "古道", value: "roadNum" },
  { label: "古渠", value: "canalNum" },
  { label: "古堰坝", value: "barrageNum" },
  { label: "古井泉", value: "wellNum" },
  { label: "古街巷", value: "streetNum" },
  { label: "古会馆", value: "guildNum" },
  { label: "古城堡", value: "castleNum" },
  { label: "古塔", value: "towerNum" },
  { label: "古寺庙", value: "templeNum" },
  { label: "近现代建筑", value: "modernBuildingNum" },
  { label: "特色建材", value: "featureNum" },
  { label: "其他", value: "other" },
];
