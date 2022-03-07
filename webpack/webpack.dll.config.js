const path = require("path");
const { resolve, join } = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '[name].dll.js',
        path: resolve(__dirname, '../dll'),
        library: '[name]_dll_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll_[hash]',
            path: resolve(__dirname, '../dll/[name].manifest.json')
        })
    ]
}