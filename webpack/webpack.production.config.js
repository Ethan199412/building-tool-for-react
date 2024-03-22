const getConfig = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')

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
    // new webpack.DllReferencePlugin({
    //     manifest: path.resolve(__dirname, "../dll/react.manifest.json"),
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //     filepath: path.resolve(__dirname, '../dll/react.dll.js')
    // })
    /* pwa */
    // new WorkboxWebpackPlugin.GenerateSW({
    //     clientsClaim: true,
    //     skipWaiting: true
    // })
)

// config.externals = {
//     'react': 'react',
//     'react-dom': 'react-dom'
// }

exports.default = merge(config, {
    mode: "production",
    devtool: "hidden-source-map",
})