const mobile = (rule, value, callback) => {
  const reg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("手机号格式不正确"));
  }
};
const email = (rule, value, callback) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱格式不正确"));
  }
};

const age = (rule, value, callback) => {
  const number = Number(value);
  if (number < 1 || number > 150) {
    callback(new Error("年龄不正确"));
  } else {
    callback();
  }
};

export default {
  data() {
    return {
      rule: {
        input: { required: true, message: "请输入", trigger: "blur" },
        upload: { required: true, message: "请上传", trigger: "blur" },
        select: { required: true, message: "请选择", trigger: "change" },
        multiSelect: {
          type: "array",
          required: true,
          message: "请选择",
          trigger: "change",
        },
        date: {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
        datetime: {
          type: "datetime",
          required: true,
          message: "请选择时间",
          trigger: "change",
        },
        mobile: { required: true, validator: mobile, trigger: "blur" },
        email: { required: true, validator: email, trigger: "blur" },
        age: { required: true, validator: age, trigger: "blur" },
      },
    };
  },
};
