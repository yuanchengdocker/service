const path    = require('path');
const webpack = require('webpack');
const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
    entry: {
        vendor: ['react','react-dom','react-router-dom','react-redux','antd']  //提取公共模块
    },
    output: {
        path: path.join(__dirname, '../src/js/dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../src/js/dll','[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};