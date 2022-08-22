<template>
  <Editor v-if="mode === 'edit'" v-model="html" />
  <Viewer v-else :value="html" />
</template>

<script>
import Editor from './Editor.vue';
import Viewer from './Viewer.vue';

export default {
  components: { Editor, Viewer },
  props: {
    mode: {
      type: String,
      default: 'edit',
      validate: (v) => ['edit', 'view'].includes(v),
    },
    value: {
      type: String,
      // default: '',
    },
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
};
</script>
