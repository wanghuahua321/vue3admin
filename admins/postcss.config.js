module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 13.36,  //设计稿是根据1366 高度
      propList: ["*", '!border'],
      unitPrecision: 2, //保留rem 小数点几位
      minPixeIValue: 12

    },
  },
};