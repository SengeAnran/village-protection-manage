<template>
  <div class="editor-com-root" @click.stop >
    <!-- 工具栏 -->
    <Toolbar v-if="init" style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
    <!-- 编辑器 -->
    <Editor
      v-if="init"
      style="height: 400px; overflow-y: hidden"
      :defaultConfig="editorConfig"
      v-model="html"
      @onChange="onChange"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { uploadFile2 } from '@/api/common.js';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

export default {
  name: 'RichTextEditor',
  components: { Editor, Toolbar },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      init: false,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: ['group-video', 'insertImage', 'group-image', 'codeBlock'],
        insertKeys: {
          index: 22, // 插入的位置，基于当前的 toolbarKeys
          keys: ['uploadImage'],
        },
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            async customUpload(file, insertFn) {
              // TS 语法
              // async customUpload(file, insertFn) {                   // JS 语法
              // file 即选中的文件
              // 自己实现上传，并得到图片 url alt href
              // 最后插入图片
              const href = '';
              const formData = new FormData();
              formData.append('file', file);
              const res = await uploadFile2(formData);
              const { filePath, fileName } = res;
              console.log('uploadImage -->', res);
              insertFn(filePath || '', fileName || '', href);
            },
          },
        },
      },
    };
  },
  computed: {
    html: {
      set: function (val) {
        this.$emit('input', val);
      },
      get: function () {
        return this.value;
      },
    },
  },
  mounted() {
    this.init = true;
    console.log(this.value);
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      this.$emit('change', editor.getHtml());
    },
    getText() {
      const editor = this.editor;
      if (editor == null) return;
      return editor.getText();
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style lang="scss" scoped>
.editor-com-root {
  border: 1px solid #ccc;
  z-index: 1000;
  pointer-events: all;
}
</style>
