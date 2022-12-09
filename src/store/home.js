const defaultLocation = '浙江省';
export default {
  namespaced: true,
  state: {
    batch: '', // 批次
    location: {
      city: '',
      county: '',
      province: defaultLocation,
    },
    area: defaultLocation,
  },
  mutations: {
    SET_BATCH(state, param) {
      if (param === '全部批次') {
        return (state.batch = '');
      }
      state.batch = param;
      console.log(state.batch);
    },
    // 设置地区市
    SET_AREA_CITY(state, value) {
      state.location.city = value;
      state.location.county = '';
      state.location.province = '';
      state.area = value;
    },
    // 设置地区县
    SET_AREA_COUNTY(state, value) {
      state.location.city = '';
      state.location.county = value;
      state.location.province = '';
      state.area = value;
    },
    // 设置地区省
    SET_AREA_PROVINCE(state, value) {
      state.location.city = '';
      state.location.county = '';
      state.location.province = value;
      state.area = value;
    },
  },
};
