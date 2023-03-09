<template>
  <div class="data-content">
    <div v-for="(item, index) in dataList" :key="index" class="label-number-item">
      <div class="label">{{ item.label }}</div>
      <div class="number">{{ item.num }}</div>
    </div>
  </div>
</template>

<script>
import { getConstructionOverview } from '@/api2/homePage';
import { mapGetters } from 'vuex';

export default {
  name: 'DataContent',
  data() {
    return {
      dataList: [
        {
          label: '创建数',
          num: 33,
          unit: '个',
        },
        {
          label: '在建数',
          num: 20,
          unit: '个',
        },
        {
          label: '验收数',
          num: 44,
          unit: '个',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['area', 'location', 'batch', 'year']),
  },
  watch: {
    area() {
      this.getData();
    },
    batch() {
      this.getData();
    },
    year() {
      this.getData();
    },
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      const data = {
        batch: this.batch,
        ...this.location,
        year: this.year,
      };
      getConstructionOverview(data).then((res) => {
        this.dataList[0].num = res.totalNumberCreated;
        this.dataList[1].num = res.numberUnderConstruction;
        this.dataList[2].num = res.acceptanceNumber;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-content {
  position: absolute;
  top: 14px;
  left: 14px;
  .label-number-item {
    display: flex;
    .label {
      margin-right: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 16px;
    }
    .number {
      font-size: 14px;
      font-family: DINPro-Medium, DINPro;
      font-weight: 500;
      color: #333333;
      line-height: 18px;
    }
  }
}
</style>
