const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// ExtractTextPlugin 4.0
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackDevconfig = {
    entry : {
        // 'vendor' : ['vue','jquery','_'],
        'index' : './src/pages/index/main.js'
    },
    mode : 'development',
    output : {
        filename : 'js/[name].js',
        path : path.join(__dirname,'./dist/index'),
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks : 'all',
                    name: 'vendor',
                    test: /vue|jquery|node_modules/,
                }
            }
        }
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                exclude: /node_modules/,
                use : ['style-loader','css-loader','postcss-loader']

            },
            {
                test : /\.less$/,
                exclude: /node_modules/,
                use : ['style-loader','css-loader','less-loader','postcss-loader']
            },
            {
                test : /\.scss$/,
                exclude: /node_modules/,
                use : ['style-loader','css-loader','sass-loader','postcss-loader']
            },
            {
                test : /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test : /\.vue$/,
                exclude: /node_modules/,
                loader : 'vue-loader',
                options : {
                    extractCSS: true  //css 抽离
                }
            }
        ]
    },
    resolve: {
        alias: {
            // 'vue': 'vue/dist/vue.js',
            'vue': path.resolve(__dirname,'./raw/vue.js'),
            '@': path.resolve(__dirname,'./src'),
            '~': path.resolve(__dirname,'./raw'),
            'jquery': path.resolve(__dirname,'./raw/jquery-2.1.1.js'),
            '_': path.resolve(__dirname,'./raw/lodash.js')
        }
    },
    plugins : [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          _ : '_'
        }),
        new CleanWebpackPlugin('./dist'),
        new OptimizeCSSPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title : 'my index',
            filename: 'index.html', //输出文件名
            template: 'template/index.html',
            excludeChunks : ['user']
        }),
        // new HtmlWebpackPlugin({
        //     title : 'user page',
        //     filename: 'user/index.html',
        //     template: 'template/user.html',
        //     chunks : ['user','vendor']
        // })
    ]
}

module.exports = webpackDevconfig;