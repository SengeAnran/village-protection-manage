import { routeType } from '../utils/routeType';
import lodash from 'lodash';

/**
 * 添加异步路由。只对1、3、4应用有效
 * @param {String} systemType 访问的系统类型
 * @param {Array} permissionList 权限列表
 */
export const addAsyncRoutes = (systemType, router, permissionList) => {
  const list = lodash.cloneDeep(routeType[systemType]);
  // console.log(list, systemType, routeType);
  const asyncRoutes = getAsyncRoutes(list, permissionList, true);
  router.addRoutes([
    // 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。
    {
      path: '/',
      name: 'Index',
      component: () => import('@/layout'),
      redirect: {
        name: asyncRoutes.length ? asyncRoutes[0].name : '',
      },
      children: asyncRoutes,
    },
  ]);

  router.addRoutes([
    {
      path: '*',
      redirect: '/404',
    },
  ]);

  return asyncRoutes;
};

/**
 * @param {Array} list 路由初始列表
 * @param {Boolean} isRoot 是否为根路由
 * @returns newList
 */
const getAsyncRoutes = (list, permissionList, isRoot) => {
  const permissionIds = permissionList.map((item) => item.menuId);
  // console.log(list);
  return list.filter((item) => {
    const menuIds = item.meta && item.meta.menuIds;
    // 没有设置权限id 或者权限id为空数组，则默认为有访问权限
    const hasPermit = !menuIds || !menuIds.length || menuIds.find((it) => permissionIds.includes(it));
    // 有访问权限
    if (hasPermit) {
      if (isRoot) {
        const result = permissionList.find((item) => menuIds.includes(item.menuId));
        item.meta.title = result.menuName || item.meta.title;
      }
      // 有children
      if (item.children && item.children.length) {
        // 默认重定向到第一个子元素
        const childrenItem = getAsyncRoutes(item.children, permissionList);
        if (childrenItem.length && item.redirect) {
          // 判断新增平台(当length>1)是否为第一个子路由, 如果是 将父路由 重定向设置为 第二个子路由
          item.redirect.name = childrenItem[0].name;
        }
        item.children = childrenItem;
        return item;
      } else {
        // 没有children
        return item;
      }
    }
    // 没有访问权限则什么都不返回
  });
};

export default addAsyncRoutes;
