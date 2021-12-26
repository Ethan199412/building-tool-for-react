const getConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        // title: 'index.html',
        template: './html/prod/index.html'
    })
)

exports.default = merge(config, {
    mode: "production",
    devtool: "hidden-source-map",
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         // title: 'index.html',
    //         template: './src/index.html'
    //     })
    // ]
})