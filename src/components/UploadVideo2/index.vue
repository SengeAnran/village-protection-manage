<template>
  <div class="upload-img-wrp" :class="{ disabled: disabled }">
    <el-upload
      ref="upload"
      action="string"
      list-type="picture-card"
      :limit="limit"
      accept="video/mp4, video/quicktime"
      :file-list="fileList"
      :before-upload="beforeImgUpload"
      :on-exceed="handleExceedImg"
      :on-change="handleFileChange"
      :http-request="uploadImg"
      :multiple="multiple"
    >
      <div class="default-upload" slot="default">
        <i class="el-icon-plus"></i>
        <p class="desc">
          <span>上传视频</span>
        </p>
      </div>
      <div slot="file" slot-scope="{ file }" style="height: 100%;">
        <video class="el-upload-list__item-thumbnail" :src="file.url"></video>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :top="'5vh'">
      <video style="width:100%; max-height: 80vh;" :src="dialogImageUrl" controls></video>
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile2 } from "@/api/common.js";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 10,
    },
    size: {
      type: Number,
      default: 10,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    fileList() {
      return this.data.map((list) => {
        return {
          name: list.fileName,
          url: list.filePath,
        };
      });
    },
  },
  methods: {
    async uploadImg(info) {
      const formData = new FormData();
      formData.append("file", info.file);
      formData.append("business", 'history');

      const res = await uploadFile2(formData);
      this.$message.success("视频上传成功");
      this.$emit("add", { ...res, uid: info.file.uid });
      // info.onSuccess(info);
      return res;
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file);
      this.$emit("remove", file);
      this.disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeImgUpload(file) {
      const isFormat =
        file.type === "video/mp4" ||
        file.type === "video/quicktime"
      const isLt2M = file.size / 1024 / 1024 < this.size;

      if (!isFormat) {
        this.$message.error("上传视频只能是 MP4、MOV 格式!");
      }
      if (!isLt2M) {
        this.$message.error(`上传视频大小不能超过 ${this.size}MB!`);
      }
      return isFormat && isLt2M;
    },
    handleExceedImg() {
      this.$message.warning(`当前限制上传 ${this.limit} 个视频`);
    },
    handleFileChange() {
      if (this.$refs.upload.uploadFiles.length >= this.limit) {
        this.disabled = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.upload-img-wrp {
  .el-icon-plus {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 14px;
  }
  &.disabled {
    ::v-deep .el-upload--picture-card {
      display: none;
    }
  }

  ::v-deep .el-upload--picture-card {
    width: 124px;
    height: 122px;
    border-radius: 4px;
    outline: 0;
  }
  ::v-deep .el-upload-list__item {
    width: 124px;
    height: 122px;
    overflow: hidden;
    border: 0;
    outline: 0;

    img {
      width: 124px;
      height: 124px;
      object-fit: contain;
    }
  }
  .default-upload {
    width: 124px;
    height: 122px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .desc {
      display: flex;
      flex-direction: column;
      & span {
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        line-height: 18px;
      }
    }
  }

  .upload-ready {
    cursor: pointer;
    width: 100%;
    height: 100%;
    img {
      object-fit: cover;
    }
    .delete-active {
      position: absolute;
      top: -12px;
      right: -12px;
      z-index: 9;
    }
  }
}
</style>
