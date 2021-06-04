<template>
  <div>
    <el-form-item label="推荐村简介">
      <el-input
        style="width: 42%"
        type="textarea"
        :rows="5"
        placeholder="请输入"
        maxlength="500"
        show-word-limit
        v-model="form.introduction"
      >
      </el-input>
    </el-form-item>
    <h4 class="block-tit">村庄图片</h4>
    <el-form-item label="" prop="villagePicturesArr">
      <UploadImg :data="imageList" @add="onImageAdd" @remove="onImageRemove" />
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      imageList: [], // 回显图片
    };
  },
  methods: {
    onImageAdd(res) {
      console.log("add");
      this.imageList.push(res);
      this.form.villagePicturesArr.push(res.fileId);
      this.$refs.form.validateField("villagePicturesArr");
    },
    onImageRemove(res) {
      console.log("remove");
      const index = this.imageList.findIndex((list) => {
        return list.uid === res.uid || list.filePath === res.url;
      });

      if (index !== -1) {
        this.imageList.splice(index, 1);
        this.form.villagePicturesArr.splice(index, 1);
      }
      this.$refs.form.validateField("villagePicturesArr");
    },
  },
};
</script>

<style lang="scss" scoped>
.block-tit {
  margin-top: 14px;
  margin-bottom: 14px;
}
</style>
