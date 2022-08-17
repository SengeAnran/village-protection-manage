import { getAreaList } from '@/api2/cockpitProgress';

// 审核状态码
export const DECLARE_STATUS = {
  '-1': '未发布',
  0: '复核退回',
  1: '已上线',
  2: '待省级审核',
  3: '通过复核',
};

// 地区级联选择 props
export const CASCADER_PROPS = {
  lazy: true,
  checkStrictly: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    getAreaList({ city: node.value || '' }).then((res) => {
      const nodes = res.map((c) => {
        return {
          value: c,
          label: c,
          leaf: level >= 1,
        };
      });
      resolve(nodes);
    });
  },
};
