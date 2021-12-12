const config = require('./webpack.common.config')
const { merge } = require('webpack-merge')
const path = require("path");

exports.default = merge(config, {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "../public/"),
        port: 3001,
        publicPath: "http://localhost:3001/dist/",
        hot: true,
        stats: {
            all: false,
            errors: true,
            warnings: true,
            color: true
        }
    },
})