export default {
  resources: {
    bill: {
      name: "发票 |||| 发票",
      fields: {
        id: "序号",
        signdate: "日期",
        material: "材料",
        size: "尺寸",
        unit: "单位",
        num: "数量",
        price: "单价",
        total: "总额",
        pid: "供方",
        bid: "需方"
      }
    },
    company: {
      name: "公司 |||| 公司",
      fields: {
        id: "税号",
        name: "公司名称",
        address: "公司地址",
        bank: "开户银行",
        tel: "联系电话",
        account: "银行卡号"
      }
    }
  }
};
