module.exports = {
  plugins: {
    "postcss-pxtorem": {
      propList: ["", '!border', '!fontSize'],
      unitPrecision: 2,
      minPixeIValue: 12

    },
  },
};