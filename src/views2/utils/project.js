/**
 * 项目类型
 */
export const types = Object.freeze([
  {
    name: '基建类',
    value: 0,
  },
  {
    name: '产业类',
    value: 1,
  },
  {
    name: '数字化类',
    value: 2,
  },
  {
    name: '民生类',
    value: 3,
  },
  {
    name: '其他类',
    value: 4,
  },
]);

const typeMap = new Map(types.map((ele) => [ele.value, ele.name]));

/**
 * 根据类型之获取类型名称
 */
export function mapType(value) {
  return typeMap.get(Number(value)) || '';
}
