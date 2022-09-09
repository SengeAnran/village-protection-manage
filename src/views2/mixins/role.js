import { USER_TYPE } from '../utils/constants';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      mixUserInfo: 'userInfo',
    }),
    mixRoleId() {
      return this.mixUserInfo?.roleId;
    },
    VILLAGE() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.VILLAGE;
    },
    COUNTRY() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER;
    },
    COUNTRY_LEADER() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.COUNTRY || roleId === USER_TYPE.COUNTRY_LEADER;
    },
    CITY() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER;
    },
    CITY_LEADER() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.CITY || roleId === USER_TYPE.CITY_LEADER;
    },
    PROVINCE() {
      const roleId = this.mixRoleId;
      return roleId === USER_TYPE.PROVINCE;
    },
  },
};
