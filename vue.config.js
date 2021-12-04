module.exports = {
    devServer:{ //开发环境配置
        port:8080,
        open:true,
        https:false,
        host:"localhost",
        proxy:{
            '/':{
                target:'http://localhost:3000/',
                changeOrigin:true,
                pathRewrite:{
                    '^/':''
                }
            }
        }
    },
    lintOnSave:false,
    productionSourceMap:false,
}