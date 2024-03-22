const getConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const path = require("path");
console.log('[p0] __dirname', __dirname)

const mode = 'development'
const config = getConfig(mode)
const rules = config.module.rules[0].oneOf

rules.forEach(e => {
    const { use } = e
    if (use.includes('css-loader')) {
        use.unshift('style-loader')
    }
})

const port = 3003
exports.default = merge(config, {
    mode,
    devServer: {
        contentBase: path.join(__dirname, "../html/dev"), // 放 html 的位置
        port,
        publicPath: `http://localhost:${port}/dist/`, // html 引 js 的位置
        hot: true,
        stats: {
            all: false,
            errors: true,
            warnings: true,
            color: true
        }
    },
    devtool: "eval-cheap-module-source-map",
    /**
     * inline-source-map: 只生成一个内联的 source-map，有错误代码信息，源代码错误位置
     * eval-source-map: 每个文件生成一个 source-map，内联，会看到多个 sourceMappingUrl，有错误代码信息，源代码错误位置，同时有一个 hash 值
     * source-map: 外联，单独生成 bundle.js.map 文件，有错误代码信息，源代码错误位置
     * hidden-source-map: 可以报错，但无法映射到源文件，不能看源代码。（刻意隐藏源码，但可以看 bundle）
     * nosources-source-map: 外联，能报错，单独生成 bundle.js.map 文件，且为一个对象，不能看源代码（全部隐藏）。（刻意隐藏源码）
     * cheap-source-map: 外部，能报错，能映射，但是代码是 es5，非源代码
     * cheap-module-source-map: 外部，能映射，代码错误精确到行而不到列，但速度快
     * 开发环境：速度快，调试友好 eval-cheap > eval > inline > cheap，综合下来折中有两种
     * eval-source-map: 调试友好，速度稍慢，eval-cheap-module-source-map: 速度更快，只精确到行，react 自带脚手架用的是 eval-source-map
     * 生产环境：需要隐藏源代码，在 hidden-source-map, nosources-source-map 里面选。且，内联会让代码体积变大，因此，不能使用内联。
     * 所以假如你调试，可以使用 source-map 和 cheap-module-source-map
     */
})