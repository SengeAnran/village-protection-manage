<template>
  <base-box-item-new class="rete-content" name="总体进度" :count="total" unit="%" :icon="iconUrl" :fixed="1">
  </base-box-item-new>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      total: 0,
      showBar: true,
      flag: true,
      iconUrl: require('./icon.png'),
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch']),
  },
  watch: {
    area() {
      this.getData();
    },
    batch() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
    window.addEventListener('resize', () => {
      if (this.flag) {
        this.flag = false;
        this.showBar = false;
        setTimeout(() => {
          this.flag = true;
          this.showBar = true;
        }, 200);
      }
    });
  },
  methods: {
    getData() {
      // const data = {
      //   batch: this.batch,
      //   ...this.location,
      // };
      //项目开工率
    },
  },
};
</script>

<style lang="scss" scoped>
.rete-content {
  position: relative;
  height: 100%;
}
</style>
