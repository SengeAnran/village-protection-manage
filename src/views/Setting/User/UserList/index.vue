<template>
  <div class="user-list-wrapper block">
    <div class="text-lg">用户列表</div>
    <SearchForm @search="handleSearch" />
    <List :form="form" @deauthorize="handleClick" />
  </div>
</template>
<script>
export default {
  name: "UserList",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleClick(data) {
      this.$emit("deauthorize", data);
    },
    handleSearch(form) {
      this.form = {
        ...form,
      };
    },
  },
  components: {
    SearchForm: () => import("./SearchForm"),
    List: () => import("./List"),
  },
};
</script>
