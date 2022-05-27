export const TABLE_SCORE_DATA = [
  {
    title: `创建方案
    实施情况
    30分`,
    content: `创建目标
    完成情况`,
    standard:
      '对照创建方案明确的创建目标，评估组根据目标完成的数量和质量酌情打分。完成率（指标完成率、投资完成率，下同）达到90%及以上且质量高，得18-20分；完成率达到85%及以上且质量良好，得15-17分；完成率达到80%及以上且质量一般，得12-14分；完成率达到70%及以上，得9-11分；完成率不到70%的，不得分。',
    totalScore: '20',
    accordance: '创建总结、现场核查',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'carryOutCreateCounty',
    cityScoreProp: 'carryOutCreateCity',
    max: 20,
  },
  {
    title: '创建方案实施情况30分',
    content: `建设项目
    竣工情况`,
    standard:
      '对照《浙江省未来乡村建设创建项目备案表》，每有一个备案项目未按进度完成的，扣1分。30%以上备案项目未完成的，此项不得分。',
    totalScore: '10',
    accordance: '项目完成情况、现场核查',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'carryOutConstructionCounty',
    cityScoreProp: 'carryOutConstructionCity',
    max: 10,
  },
  //****** 重要指标完成情况 *******
  {
    title: `重要指标
    完成情况
    15分`,
    content: '共性指标',
    standard:
      '对照创建方案明确的关于居民收入水平、村级集体经济年经营性收入、常住人口情况、基础设施建设水平、公共服务配套水平、农村人居环境水平、乡村风貌水平、治安刑事案件发生率、新增乱占耕地建房问题发生率、违章建筑处置率、群众满意度等共性指标要求，每有一项未完成的扣1分，5项及以上未完成的，此项不得分。',
    totalScore: '10',
    accordance: '指标完成情况、现场核查',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'indicatorsCommonalityCounty',
    cityScoreProp: 'indicatorsCommonalityCity',
    max: 15,
  },
  {
    title: '重要指标完成情况15分',
    content: '个性指标',
    standard: '对照创建方案明确的3至5项本村个性指标要求，每有一项未完成的扣1分，3项及以上未完成的，此项不得分。',
    totalScore: '5',
    accordance: '指标完成情况',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'indicatorsPersonalityCounty',
    cityScoreProp: 'indicatorsPersonalityCity',
    max: 5,
  },
  //***** 数字化应用情况 ********
  {
    title: `数字化
    应用情况
    12分`,
    content: `数字社会
    入驻情况`,
    standard: '落地省“未来乡村”应用场景，得2分；入驻浙里办数字社会“我的家园”，根据注册率和日活率情况得1-3分。',
    totalScore: '5',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'digitalSocietyCounty',
    cityScoreProp: 'digitalSocietyCity',
    max: 5,
  },
  {
    title: '数字化应用情况12分',
    content: `应用场景
    使用效果`,
    standard:
      '根据当地群众生产、生活需求实际，建设或接入各级、各类数字化应用。数字应用符合实际和需求，注册率和日活率较好得5-7分；数字化应用基本符合需求，注册率和日活率较一般，得3-4分；有数字化应用，但注册率和日活率不高，得1-2分。',
    totalScore: '7',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'digitalScenesCounty',
    cityScoreProp: 'digitalScenesCity',
    max: 7,
  },
  //****** 场景建设成效 *******
  {
    title: `场景建设
    成效
    20分`,
    content: '基本要求',
    standard:
      '根据当地群众需求，整合现有资源，按照集中和分散相结合的方式，系统构建党建统领的系列民生场景，根据实际成效和作用发挥得4-9分。',
    totalScore: '9',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'scenesBasicCounty',
    cityScoreProp: 'scenesBasicCity',
    max: 9,
  },
  {
    title: '场景建设成效20分',
    content: '建设导向',
    standard: '场景建设能切实体现人本化、生态化、数字化导向，根据实际成效和作用发挥得2-5分。',
    totalScore: '5',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'scenesBuildCounty',
    cityScoreProp: 'scenesBuildCity',
    max: 5,
  },
  {
    title: '场景建设成效20分',
    content: '重点内容',
    standard: '围绕村民急难愁盼问题开展场景建设，特别是解决“一老一小”相关问题场景建设，根据实际成效和作用发挥得3-6分。',
    totalScore: '6',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'scenesEmphasisCounty',
    cityScoreProp: 'scenesEmphasisCity',
    max: 6,
  },
  //****** 建设投入情况 *******
  {
    title: `建设投入
    情况
    9分`,
    content: '投入到位',
    standard:
      '创建方案中各级财政投入和村集体、农户、社会投入到位情况，到位率在100%及以上的，得5分；到位率在95%及以上的，得4分；到位率在90%及以上的，得3分；到位率不到90%的不得分。到位资金包括建设单位已入账的资金和预计明确可入账的资金。',
    totalScore: '5',
    accordance: '项目台账',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'buildPutInCounty',
    cityScoreProp: 'buildPutInCity',
    max: 5,
  },
  {
    title: '建设投入情况9分',
    content: '资金支持环节',
    standard: '财政资金支持环节不科学、不合理等的，酌情扣1-2分。',
    totalScore: '2',
    accordance: '项目台账',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'buildSupportCounty',
    cityScoreProp: 'buildSupportCity',
    max: 2,
  },
  {
    title: '建设投入情况9分',
    content: '资金使用管理',
    standard: '资金管理制度不健全，支出不合规定，存在资金拨付、入账手续和凭证不完整等情形的，根据严重程度酌情扣1-2分。',
    totalScore: '2',
    accordance: '项目台账',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'buildUseCounty',
    cityScoreProp: 'buildUseCity',
    max: 2,
  },
  //****** 工作推进情况 *******
  {
    title: `工作推进
    情况
    9分`,
    content: '工作机制',
    standard:
      '组织领导、村民主体作用发挥、活动组织、村庄经营、长效管理等方面不到位、存在较大问题等情形的，根据严重程度酌情扣1-2分。',
    totalScore: '3',
    accordance: '现场核查',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'workMechanismCounty',
    cityScoreProp: 'workMechanismCity',
    max: 3,
  },
  {
    title: '工作推进情况9分',
    content: '项目管理',
    standard:
      '项目法人负责制、招标投标制、建设监理制和合同管理制落实不到位，项目管理规范水平较低等情形的，根据严重程度酌情扣1-2分。',
    totalScore: '3',
    accordance: '项目台账',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'workBoardCounty',
    cityScoreProp: 'workBoardCity',
    max: 3,
  },
  {
    title: '工作推进情况9分',
    content: '业务指导',
    standard: '发现县级业务主管部门日常工作指导服务不到位、督促检查较少等情形的，根据严重程度酌情扣1-2分。',
    totalScore: '3',
    accordance: '现场核查',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'workGuideCounty',
    cityScoreProp: 'workGuideCity',
    max: 3,
  },

  //****** 特色和创新情况 *******
  {
    title: `特色和创新
    情况
    5分`,
    content: '',
    standard:
      '未来乡村创建成效显著，获得省级政府及以上荣誉的，每次得3分；每获得1次省部级主要领导及以上批示肯定的，得2分；每获得1次省部级领导批示肯定的得1分。列为省级以上现场会考察点的，每次得2分。累计最高得5分。',
    totalScore: '5',
    accordance: '领导批示',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'featureCounty',
    cityScoreProp: 'featureCity',
    max: 5,
  },

  //****** 负面清单 *******
  {
    title: '负面清单',
    content: '',
    standard: `1.闲置、荒芜耕地，出现耕地“非农化”、新增乱占耕地建房情况。
    2.随意毁山、填水、砍树，破坏自然生态、乡村风貌。
    3.毁坏文物古迹、古树名木、历史文化（传统）村落，拆除有保护价值的老房子。
    4.违背农民集体意愿搞强拆强建、大拆大建，强迫农民上楼。
    5.清空世世代代居住的村民，为了老板，赶走老乡，把村庄当作一件商品售卖。
    6.生搬硬套搞“城市化”“西洋化”，建造与乡村风貌不协调的人造景观、商业街区、异形建筑。
    7.脱离实际、好高骛远，搞急功近利、劳民伤财的“面子工程”“形象工程”。
    8.刚开始建设就急于夸张宣传，把主要精力放在喊口号、玩概念上，不重实效重包装，搞“材料出政绩”。
    9.近三年发生过重特大刑事案件、群体性事件、涉黑涉恶问题等。
    出现以上任何一条负面情形且情节严重的，不得评为良好及以上等次。`,
    totalScore: '',
    accordance: '现场核查、群众随访',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'negativeCounty',
    cityScoreProp: 'negativeCity',
  },

  //****** 合计 *******
  {
    title: '合计',
    content: '',
    standard: ``,
    totalScore: '100',
    accordance: '',
    countyScore: '',
    cityScore: '',
    countyScoreProp: 'totalCounty',
    cityScoreProp: 'totalCity',
  },
];
