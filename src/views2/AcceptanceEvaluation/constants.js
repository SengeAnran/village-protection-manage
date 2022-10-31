// 省级审核状态码
export const PRO_DECLEAR_STATUS = {
  2004: '省级未审核',
  2999: '省级已审核',
};

export const CITY_LEVEL_RATING = ['合格', '良好', '优秀'];

// 县级默认表单
export const COUNTY_DEFAULT_FORM = {
  isSave: undefined,
  isAllocated: undefined, // 是否配备物业
  propertyType: '', // 物业类型
  provisionService: [], // 配备服务
  id: '',
  areaId: '',
  buildPutInCounty: '',
  buildSupportCounty: '',
  buildUseCounty: '',
  carryOutConstructionCounty: '',
  carryOutCreateCounty: '',
  completionStatement: '',
  conclusion: '',
  countySaveAnnex: [],
  declarationId: '',
  digitalScenesCounty: '',
  digitalSocietyCounty: '',
  featureCounty: '',
  indicatorsCommonalityCounty: '',
  indicatorsPersonalityCounty: '',
  negativeCounty: '',
  saveToGo: '',
  scenesBasicCounty: '',
  scenesBuildCounty: '',
  scenesEmphasisCounty: '',
  totalCounty: '',
  workBoardCounty: '',
  workGuideCounty: '',
  workMechanismCounty: '',
  selfAssessmentSummary: [],
  selfAssessmentFile: [],
  // oldSmallPics: [],
  oldSmallSelfReport: [],
  oldSmallVideo: [],
};

// 市级默认表单
export const CITY_DEFAULT_FORM = {
  cityAcceptTime: '',
  cityLevelRating: '',
  // cityRanking: '',
  citySaveAnnex: {},
  cityVerify: '',
  id: 0,
  saveToGoCity: 0, //0/1 默认是提交
  cityOpinion: '', // 驳回说明

  buildPutInCity: '',
  buildSupportCity: '',
  buildUseCity: '',
  carryOutConstructionCity: '',
  carryOutCreateCity: '',
  digitalScenesCity: '',
  digitalSocietyCity: '',
  featureCity: '',
  indicatorsCommonalityCity: '',
  indicatorsPersonalityCity: '',
  negativeCity: '',
  scenesBasicCity: '',
  scenesBuildCity: '',
  scenesEmphasisCity: '',
  totalCity: '',
  workBoardCity: '',
  workGuideCity: '',
  workMechanismCity: '',
};

// 省级默认表单
export const PROVINCE_DEFAULT_FORM = {
  id: 0,
  provinceOpinion: '',
  provinceVerify: '',
  saveToGoProvince: 0,
};
