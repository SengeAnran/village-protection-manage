import store from "@/store";
/**
 * 按钮权限控制指令
 * v-permission directive
 */
export default {
  inserted: (el, binding) => {
    const { permissionList } = store.getters;
    const list = permissionList.map((item) => item.menuId) || [];
    if (!list.includes(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
