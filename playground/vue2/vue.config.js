const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config){
    config.module.rules.delete('tsx')
  },
  configureWebpack: {
    plugins: [
      require('unplugin-vue-jsx-hmr/webpack')({
        vueBabel:{
          modules: false,
          // targets:[
          //   "> 1%",
          //   "last 2 versions",
          //   "not dead"
          // ]
        }
        
      }),
    ],
  },
})
