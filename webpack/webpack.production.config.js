const config = require('./webpack.common.config')
const { merge } = require('webpack-merge')

exports.default = merge(config, {
    mode: "production",
})