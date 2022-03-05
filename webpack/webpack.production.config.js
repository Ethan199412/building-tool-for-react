const getConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const mode = 'production'
const config = getConfig(mode)

const rules = config.module.rules[0].oneOf

rules.forEach(e => {
    const { use } = e
    if (use.includes('css-loader')) {
        use.unshift(MiniCssExtractPlugin.loader)
    }
})

config.plugins.push(
    new MiniCssExtractPlugin({
        filename: 'index.[contenthash].css',
        // chunkFilename: 'css/[id].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
        template: './html/prod/index.html'
    }),
<<<<<<< HEAD
    new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
    })
=======
    // new WorkboxWebpackPlugin.GenerateSW({
    //     clientsClaim: true,
    //     skipWaiting: true
    // })
>>>>>>> 1786f0f3c3590279156eb20c476ac305dd7abd28
)

config.externals = {
    'react': 'react',
    'react-dom': 'react-dom'
}

exports.default = merge(config, {
    mode: "production",
    devtool: "hidden-source-map",
})