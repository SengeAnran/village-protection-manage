<template>
  <div>
    <el-button @click="goSystem(2)">浙江省未来乡村建设服务平台</el-button>
    <el-button @click="goSystem(1)">历史文化村落保护管理应用</el-button>
    <el-button @click="goSystem(3)">跟着节气游乡村管理后台</el-button>
  </div>
</template>

<script>
const getAsyncRoutes = (list, isRoot) => {
  const permissionList = store.getters.permissionList;
  const permissionIds = permissionList.map((item) => item.menuId);
  return list.filter((item) => {
    const menuIds = item.meta && item.meta.menuIds;
    // 没有设置权限id 或者权限id为空数组，则默认为有访问权限
    const hasPermit =
      !menuIds ||
      !menuIds.length ||
      menuIds.find((it) => permissionIds.includes(it));
    // 有访问权限
    if (hasPermit) {
      if (isRoot) {
        const result = permissionList.find((item) =>
          menuIds.includes(item.menuId)
        );
        item.meta.title = result.menuName || item.meta.title;
      }
      // 有children
      if (item.children && item.children.length) {
        // 默认重定向到第一个子元素
        const childrenItem = getAsyncRoutes(item.children);
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
import store from "@/store";
import { mapMutations, mapGetters } from "vuex";
import lodash from "lodash";
import { defaultRoutes, defaultRoutes2 } from "../router/navList";
import router from "../router";
export default {
  name: "index",
  methods: {
    ...mapMutations("user", ["SET_SYSTEM_TIME"]),
    async goSystem(type) {
      this.SET_SYSTEM_TIME(type);
      window.localStorage.setItem("systemType", type);
      console.log('this.changeSystem',this.changeSystem);
      // console.log(store.getters.changeSystem || !store.getters.hasGetRoute);
      if (this.changeSystem || !this.hasGetRoute) { // 切换用户 或无目录
        // 如果没有获取路由信息，先获取路由信息而后跳转
        const roleSystemType = this.roleSystemType; // 系统类型
        await this.$store.dispatch("user/getRouteList", roleSystemType);
        const list = lodash.cloneDeep(roleSystemType === 2? defaultRoutes2 : defaultRoutes);
        console.log(list);
        const asyncRoutes = getAsyncRoutes(list, true);
        console.log(asyncRoutes);
        this.$store.commit("user/SET_ROUTE_LIST", asyncRoutes); // 存储routeList
        router.addRoutes([ // 动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组。
          {
            path: "/",
            name: "Index",
            component: () => import("@/layout"),
            redirect: {
              name: asyncRoutes.length ? asyncRoutes[0].name : "",
            },
            children: asyncRoutes,
          },
        ]);
        console.log(router);
        router.addRoutes([
          {
            path: "*",
            redirect: "/404",
          },
        ]);
        console.log(type);
        if (roleSystemType === 2) {
          console.log('2222222');
          this.$router.push("/villageApplication2/index");
        } else {
          this.$router.push("/villageApplication/index");
        }
      }
    },
  },
  computed: {
    ...mapGetters(["hasGetRoute", "changeSystem", "roleSystemType"])
  },
}
</script>

<style lang="scss" scoped>

</style>