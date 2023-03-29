<template>
  <el-dialog
    class="my-el-dialog"
    :visible="dialog"
    append-to-body
    width="420px"
    title="附码记录"
    @close="$emit('closeView')"
  >
    <div class="attache-time">附码时间：{{ time }}</div>
    <div class="code-history-item" v-for="(item, index) in dataList" :key="index">
      <div class="item">
        <img :src="codeUrl[item.attachType]" alt="" />
        <div class="item-right">
          <div class="right-top">
            <div class="time" :class="item.class">{{ item.attachTime.slice(0, 10) }}</div>
            <div class="transcoding">{{ item.attachTypeChanges }}</div>
          </div>
          <div class="right-bottom"><span>转码原因：</span>{{ item.reason }}</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getAttachedCodeRecord } from '@/api2/homePage';

export default {
  props: {
    dialog: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
  },
  data() {
    return {
      dataList: [],
      time: '',
      codeUrl: {
        红码: require('./imgs/red.png'),
        黄码: require('./imgs/yellow.png'),
        绿码: require('./imgs/green.png'),
      },
      codeClass: {
        红码: 'red',
        黄码: 'yellow',
        绿码: 'green',
      },
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        id: this.id,
      };
      getAttachedCodeRecord(params).then((res) => {
        this.dataList =
          res.map((i) => {
            return {
              ...i,
              class: this.codeClass[i.attachType],
            };
          }) || [];
        if (this.dataList.length > 0) {
          this.time = this.dataList[0].attachTime.slice(0, 10);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-el-dialog ::v-deep .el-dialog__header {
  text-align: center;
}
.my-el-dialog ::v-deep .el-dialog__body {
  padding-top: 0;
}
.attache-time {
  margin-bottom: 16px;
}
.code-history-item {
  .item {
    display: flex;
    .item-right {
      .right-top {
        display: flex;
        line-height: 24px;
        .time {
          width: 110px;
          height: 24px;
          padding-left: 10px;
          border-radius: 0px 12px 12px 0px;
          opacity: 0.8;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          margin-right: 10px;
          &.red {
            background: rgba(212, 0, 0, 0.05);
            color: #d70e0e;
          }
          &.green {
            background: rgba(212, 0, 0, 0.05);
            color: #15be50;
          }
          &.yellow {
            background: rgba(229, 170, 34, 0.05);
            color: #e5aa22;
          }
        }
      }
      .right-bottom {
        margin: 6px 10px 0;
        span {
          font-weight: 500;
        }
      }
    }
  }
}
.code-history-item:nth-of-type(n + 3)::before {
  display: block;
  content: '';
  width: 1px;
  height: 40px;
  opacity: 0.5;
  border: 1px solid #979797;
  margin: 10px 25px;
}
</style>
