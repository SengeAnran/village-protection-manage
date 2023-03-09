<template>
  <div class="sort">
    <base-min-title>各地市未来乡村创建数排名</base-min-title>
    <SortList :listData="listData"></SortList>
  </div>
</template>

<script>
import SortList from '../SortList';
import { mapGetters } from 'vuex';
import { getRanking } from '@/api2/homePage';
export default {
  name: 'Sort',
  components: { SortList },
  data() {
    return {
      listData: [],
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
  },
  methods: {
    getData() {
      const data = {
        batch: this.batch,
        ...this.location,
      };
      getRanking(data).then((res) => {
        this.listData = res.map((i) => {
          return {
            name: i.name,
            value: i.numberOfCreated,
            unit: '个',
          };
        });
      });
    },
  },
};
</script>

<style scoped></style>
