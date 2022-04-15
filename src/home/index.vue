<template>
  <div class="home">
    <div class="box">
      <div class="item" v-for="(item, index) in dataList" :key="index" @click="goSystem(item.type, item.path)">
        <div class="img">
          <img :src="item.iconURL" alt="">
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
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
// import { defaultRoutes, defaultRoutes2 } from "../router/navList";
import router from "../router";
import { routeType } from "../utils/routeType";
export default {
  name: "index",
  data() {
    return {
      dataList: [
        {
          name: "未来乡村建设工作台",
          iconURL: require("./imgs/icon_01.png"),
          path: "/villageApplication2/index",
          type: 2,
        },
        {
          name: "历史文化村落保护管理应用",
          iconURL:  require("./imgs/icon_02.png"),
          path: "/villageApplication/index",
          type: 1,
        },
        {
          name: "跟着节气游乡村管理后台",
          iconURL:  require("./imgs/icon_02.png"),
          path: "",
          type: 1,
        },
        {
          name: "未来乡村小程序管理后台",
          iconURL:  require("./imgs/icon_03.png"),
          path: "/neighborhoodMutualAid/index",
          type: 3,
        },
        // {
        //   name: "",
        //   iconURL: "",
        //   path: "",
        //   type: 1,
        // },
        // {
        //   name: "",
        //   iconURL: "",
        //   path: "",
        //   type: 1,
        // },

      ]
    }
  },
  methods: {
    ...mapMutations("user", ["SET_SYSTEM_TIME"]),
    async goSystem(type, path) {
      this.SET_SYSTEM_TIME(type);
      window.localStorage.setItem("systemType", type);
      console.log('this.changeSystem',this.changeSystem);
      // console.log(store.getters.changeSystem || !store.getters.hasGetRoute);
      const roleSystemType = this.roleSystemType; // 系统类型
      await this.$store.dispatch("user/getRouteList", roleSystemType);
      console.log(routeType[roleSystemType]);
      const list = lodash.cloneDeep(routeType[roleSystemType]);
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
      console.log(!path, path);
      if (!path) {
        this.$message({
          message: "该功能还未上线，请等待！",
          type: "warning",
        });
        return;
      }
      this.$router.push(path);
    },
  },
  computed: {
    ...mapGetters(["hasGetRoute", "changeSystem", "roleSystemType"])
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../assets/imgs/home.png) no-repeat left center;
  background-size: cover;

  align-items: center;

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1040px;
    display: flex;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      text-align: center;
      margin-right: 40px;
      margin-top: 40px;
      margin-bottom: 40px;
      width: 230px;
      height: 172px;
      background: rgba(69, 130, 187, 0.2);
      box-shadow: 0px 4px 8px 0px rgba(25, 64, 102, 0.4);
      border-radius: 20px;
      border: 2px solid #C0E0FF;
      .img{
        height: 92px;
        img {
          width: 100%;
          height: 100%;
          object-fit: none;
        }
      }
      .title {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 25px;
        letter-spacing: 1px;
      }
      .name {
        margin-top: 16px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
        letter-spacing: 1px;
      }
    }
    .item:hover {
      border: 4px solid #C0E0FF;
      background: rgba(125, 178, 227, 0.4);
      box-shadow: 0px 8px 12px 0px rgba(25, 64, 102, 0.6);
    }
    .item:nth-child(4n) {
      margin-right: 0;
    }
  }

}
</style>