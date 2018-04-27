const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// ExtractTextPlugin 4.0
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry : {
        // 'vendor' : ['vue','jquery'],
        'index' : './src/pages/index/main.js',
        // 'user' : './src/pages/user/main.js'
    },
    mode : 'production',
    output : {
        filename : 'js/[name].[hash:8].js',
        path : path.resolve(__dirname,'./dist/index')
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
          // _ : '_'
        }),
        new CleanWebpackPlugin('./dist'),
        new OptimizeCSSPlugin(),
        new ExtractTextPlugin("css/[name].[hash:8].min.css"),
        new HtmlWebpackPlugin({
            title : 'my index',
            filename: 'index.[hash:8].html', //输出文件名
            template: 'template/index.html',
            minify : {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            excludeChunks : ['user']
        }),
        // new HtmlWebpackPlugin({
        //     title : 'user page',
        //     filename: 'pages/user.[hash:8].html',
        //     template: 'template/user.html',
        //     minify : {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //     },
        //     chunks : ['user','vendor']
        // })
    ]
}
