<template>
  <div>
    <!--搜索-->
    <div v-if="!hideSearch" class="search">
      <!--搜索插槽-->
      <slot name="search"></slot>

      <div style="display: inline-block">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button plain @click="resetSearch">重置</el-button>
      </div>
    </div>

    <!--crud操作-->
    <div style="margin-bottom: 15px">
      <el-button
        v-if="!hideAdd"
        v-permission="permissionAdd"
        type="primary"
        @click="addItem"
        >新增</el-button
      >
      <slot name="crudAction"></slot>
      <el-button
        v-if="selection && multipleDelete"
        v-permission="permissionDelete"
        :disabled="selections.length === 0"
        plain
        @click="deleteMultiple"
        >批量删除</el-button
      >
    </div>

    <!--表格-->
    <el-table
      v-if="!hideTable"
      class="table"
      v-loading="loading"
      :data="items"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
        fixed="left"
      ></el-table-column>
      <el-table-column label="序号" width="80" align="center" fixed="left">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (page - 1) * size }}
        </template>
      </el-table-column>

      <!--表格列插槽-->
      <slot name="table" :data="items"></slot>

      <el-table-column
        v-if="!hideTableAction"
        label="操作"
        :width="actionWidth"
        fixed="right"
        align="center"
      >
        <template slot-scope="scope">
          <!--表格操作插槽-->
          <div class="table-action">
            <slot name="tableAction" :data="scope.row"></slot>
            <el-link
              v-if="!hideEdit"
              v-permission="permissionEdit"
              type="primary"
              @click="
                $router.push({
                  path: editPath,
                  query: { id: scope.row[idKey] },
                })
              "
              >编辑</el-link
            >
            <el-link
              v-if="!hideView"
              type="primary"
              @click="
                $router.push({
                  path: viewPath,
                  query: { id: scope.row[idKey] },
                })
              "
              >查看</el-link
            >
            <el-link
              v-if="!hideDelete"
              v-permission="permissionDelete"
              type="danger"
              @click.native="deleteItem(scope.row)"
              >删除</el-link
            >
            <slot name="tableEdit" :data="scope.row"></slot>
            <!--          <el-button-->
            <!--            v-if="!hideDelete"-->
            <!--            type="text"-->
            <!--            :loading="loading"-->
            <!--            @click="deleteItem(scope.row)"-->
            <!--            >删除</el-button-->
            <!--          >-->
            <slot name="tableDelete" :data="scope.row"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--自定义数据插槽-->
    <slot name="data" :data="items"></slot>

    <!--分页-->
    <div style="text-align: right">
      <el-pagination
        v-if="!hidePagination"
        style="margin-top: 15px"
        background
        :current-page.sync="page"
        :page-sizes="sizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
      />
    </div>

    <!--弹窗-->
    <div v-if="dialogDestroyOnClose ? dialog : true">
      <el-dialog
        :visible.sync="dialog"
        :width="dialogWidth"
        :title="`${modeText}${title}`"
        :close-on-click-modal="closeOnClickModal"
      >
        <div>
          <el-form ref="form" :model="form" :label-width="labelWidth">
            <!--表单插槽-->
            <slot name="form"></slot>
          </el-form>
        </div>
        <div v-if="!hideDialogAction" slot="footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            v-if="!hideSave"
            type="primary"
            :loading="loading"
            @click="saveItem"
            >确定</el-button
          >
          <!--表单操作插槽-->
          <slot name="dialogAction"></slot>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    // 表单对象
    form: {
      type: Object,
      default: () => ({}),
    },
    // 搜索对象
    query: {
      type: Object,
      default: () => ({}),
    },
    // 弹窗标题
    title: {
      type: String,
      default: "",
    },
    // 表格是否开启多选模式
    selection: {
      type: Boolean,
      default: false,
    },
    // 获取数据方法
    getMethod: {
      type: Function,
    },
    // 自定义获取数据方法（无分页等）
    customGetMethod: {
      type: Function,
    },
    // 新增数据方法
    addMethod: {
      type: Function,
    },
    // 编辑数据方法
    updateMethod: {
      type: Function,
    },
    // 删除数据方法
    deleteMethod: {
      type: Function,
    },
    // 获取数据后方法（items重新赋值等处理）
    afterGetMethod: {
      type: Function,
    },
    // 编辑前方法（将item需要提交的值赋到form，父组件必须操作）
    beforeEditMethod: {
      type: Function,
    },
    // 提交前方法，返回新的data值
    beforeSaveMethod: {
      type: Function,
    },
    // 删除前方法，返回新的data值
    beforeDeleteMethod: {
      type: Function,
    },
    // 数据id key
    idKey: {
      type: String,
      required: true,
    },
    // 新增权限
    permissionAdd: {
      type: [Number, String],
      required: true,
    },
    // 编辑权限
    permissionEdit: {
      type: [Number, String],
      required: true,
    },
    // 删除权限
    permissionDelete: {
      type: [Number, String],
      required: true,
    },
    // 新增页面地址
    addPath: {
      type: String,
      default: "",
    },
    // 编辑页面地址
    editPath: {
      type: String,
      default: "",
    },
    // 查看页面地址
    viewPath: {
      type: String,
      default: "",
    },
    // 隐藏新增按钮
    hideAdd: {
      type: Boolean,
      default: false,
    },
    // 批量删除
    multipleDelete: {
      type: Boolean,
      default: false,
    },
    // 隐藏搜索
    hideSearch: {
      type: Boolean,
      default: false,
    },
    // 隐藏分页
    hidePagination: {
      type: Boolean,
      default: false,
    },
    // 隐藏表格
    hideTable: {
      type: Boolean,
      default: false,
    },
    // 隐藏表格操作列
    hideTableAction: {
      type: Boolean,
      default: false,
    },
    // 隐藏弹窗操作
    hideDialogAction: {
      type: Boolean,
      default: false,
    },
    // 隐藏编辑按钮
    hideEdit: {
      type: Boolean,
      default: false,
    },
    // 隐藏查看按钮
    hideView: {
      type: Boolean,
      default: false,
    },
    // 隐藏删除按钮
    hideDelete: {
      type: Boolean,
      default: false,
    },
    // 隐藏表单确定按钮
    hideSave: {
      type: Boolean,
      default: false,
    },
    // 编辑和删除区域宽度
    actionWidth: {
      type: String,
      default: "140px",
    },
    // 弹窗宽度
    dialogWidth: {
      type: String,
      default: "500px",
    },
    // 是否点击遮罩关闭弹窗
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // 弹窗是否关闭后销毁
    dialogDestroyOnClose: {
      type: Boolean,
      default: false,
    },
    // 表单label宽度，95容纳5个字
    labelWidth: {
      type: String,
      default: "95px",
    },
  },
  data() {
    return {
      defaultForm: _.cloneDeep(this.form),
      defaultQuery: _.cloneDeep(this.query),
      loading: true,
      dialog: false,
      mode: 0, // 0新增，1编辑
      items: [],
      page: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
      total: 0,
      selections: [],
    };
  },
  watch: {
    page() {
      this.getItems();
    },
    dialog(show) {
      if (!show) {
        this.mode = 0;
        if (!this.dialogDestroyOnClose) {
          this.resetForm(); // 防止dom销毁报错
        }
        this.updateForm(_.cloneDeep(this.defaultForm));
        this.$emit("dialogClose");
      }
    },
  },
  computed: {
    modeText() {
      let text = "新增";
      if (this.mode === 0) {
        text = "新增";
      } else if (this.mode === 1) {
        text = "编辑";
      }
      return text;
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    // 获取数据
    async getItems() {
      const { page, size, query } = this;
      const params = {
        pageNum: page,
        pageSize: size,
        ...query,
      };
      this.loading = true;
      try {
        if (this.customGetMethod) {
          this.customGetMethod(params);
        } else {
          const res = await this.getMethod(params);
          this.items = res.content;
          this.total = res.totalSize;
        }
        this.loading = false;
        this.afterGetMethod && this.afterGetMethod();
      } finally {
        this.loading = false;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getItems();
    },
    // 搜索重置
    resetSearch() {
      this.updateQuery(_.cloneDeep(this.defaultQuery));
      // 用户$nextTick等待query从父组件同步过来
      this.$nextTick(() => {
        this.page = 1;
        this.getItems();
      });
    },
    // 打开弹窗
    openDialog() {
      this.dialog = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialog = false;
    },
    // 新增
    addItem() {
      this.$router.push(this.addPath);
      // this.updateForm(_.cloneDeep(this.defaultForm));
      // this.openDialog();
      // this.mode = 0;
    },
    // 编辑
    editItem(item) {
      if (!this.beforeEditMethod) {
        console.error("请传入 beforeEditMethod 处理数据回填");
        return;
      }
      this.beforeEditMethod(item);
      this.openDialog();
      this.mode = 1;
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
    },
    // 删除
    async deleteItem(item) {
      this.$confirm("是否删除该条数据？", "提示", {
        type: "warning",
      }).then(async () => {
        this.loading = true;
        try {
          let data = [item[this.idKey]];
          if (this.beforeDeleteMethod) {
            data = this.beforeDeleteMethod(item);
          }
          await this.deleteMethod(data);
          this.$notify.success("删除成功");
          await this.getItems();
        } finally {
          this.loading = false;
        }
      });
    },
    // 批量删除
    async deleteMultiple() {
      this.$confirm("是否批量删除所选数据？", "提示", {
        type: "warning",
      }).then(async () => {
        this.loading = true;
        try {
          let data = this.selections.map((item) => item[this.idKey]);
          await this.deleteMethod(data);
          this.$notify.success("删除成功");
          await this.getItems();
        } finally {
          this.loading = false;
        }
      });
    },
    // 保存
    async saveItem() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            let data = this.form;
            if (this.beforeSaveMethod) {
              data = this.beforeSaveMethod();
            }
            if (this.mode === 0) {
              await this.addMethod(data);
            } else if (this.mode === 1) {
              await this.updateMethod(data);
            }
            this.$notify.success(`${this.modeText}成功`);
            this.closeDialog();
            this.resetForm();
            await this.getItems();
          } finally {
            this.loading = false;
          }
        }
      });
    },
    // 分页大小切换
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getItems();
    },
    // 表格多选回调
    selectionChange(val) {
      this.selections = val;
      this.$emit("selectionChange", val);
    },
    // 同步form到父组件
    updateForm(form) {
      this.$emit("update:form", form);
    },
    // 同步query到父组件
    updateQuery(query) {
      this.$emit("update:query", query);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  > * {
    margin-right: 15px;
    margin-bottom: 5px;
  }
}
.table {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.05);
  ::v-deep tr th {
    background-color: #f3f3f3;
    color: #222;
  }
}
.table-action {
  > * {
    margin: 0 4px;
  }
}
</style>
