const path = require("path");
const platform = process.platform;
let isLinux = platform.startsWith("linux") ? true : false; //linux


const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,


  // 输出文件目录
  outputDir: isLinux
    ? path.resolve(
      __dirname,
      "/var/lib/ebistrategy/earth/resources/ui/default/wadmins"
    )
    : path.resolve(__dirname, "D:/EarthResource/ui/default/wadmins"),
  // 生产环境是否生成 sourceMap 文件
  chainWebpack: config => {
    config.plugin('html').tap(args => { console.log('[ args ] >', args); args[0].title = "Marketing"; return args })
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include
      .add(path.resolve('src/assets/icons')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

  },
  devServer: {
    proxy: {
      '/i': {
        target: 'https://192.168.0.115:5800',
        changeOrigin: true,
        //  ws: true,
        pathRewrite: {
          '^/i': '',
        },
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
              @import "@/assets/css/common.scss";
          `},
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ff6b48',
            'link-color': '#ff6b48',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    }
  }


})
