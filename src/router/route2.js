import { routeType } from '../utils/routeType';
import lodash from 'lodash';

/**
 * @param {Array} list 路由初始列表
 * @param {Number} roleId 角色ID
 * @param {Boolean} isRoot 是否为根路由
 * @returns newList
 */
const getAsyncRoutes2 = (list, roleId) => {
  //console.log(list);
  return list.filter((item) => {
    const menuIds = item.meta && item.meta.menuIds;
    // 没有设置权限id 或者权限id为空数组，则默认为有访问权限
    const hasPermit = !menuIds || !menuIds.length || menuIds.includes(roleId);
    // 有访问权限
    if (hasPermit) {
      // 有children
      if (item.children && item.children.length) {
        // 默认重定向到第一个子元素
        const childrenItem = getAsyncRoutes2(item.children, roleId);
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

/**
 * 4类型的应用添加路由。与1、2、4不同的是。
 * 4类型的路由是根据角色ID来进行判断的
 */
const addAsyncRoutes2 = (systemType, router, roleId) => {
  const list = lodash.cloneDeep(routeType[systemType]);
  const asyncRoutes = getAsyncRoutes2(list, roleId);
  //console.log(list, asyncRoutes);
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

export default addAsyncRoutes2;
