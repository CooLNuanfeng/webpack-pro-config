const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// ExtractTextPlugin 4.0
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const entrys = require('../entrys.config.js');
let configArr = [];


entrys.forEach((item)=>{
    let json = {
        entry : {
            [item.page] : './src/pages/'+item.page+'/main.js',
        },
        mode : 'production',
        output : {
            filename : 'js/[name].[chunkhash:8].js',
            path : path.resolve(__dirname,'../dist/'+item.page)
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks : 'all',
                        name: 'vendor',
                        test: /vue|jquery/,
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
                'vue': path.resolve(__dirname,'../raw/vue.js'),
                '@': path.resolve(__dirname,'../src'),
                '~': path.resolve(__dirname,'../raw'),
                'jquery': path.resolve(__dirname,'../raw/jquery-2.1.1.js'),
                '_': path.resolve(__dirname,'../raw/lodash.js')
            }
        },
        plugins : [
            new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              // _ : '_'
            }),
            new CleanWebpackPlugin(['dist'],{
                root: path.resolve(__dirname, '../')
            }),
            new OptimizeCSSPlugin(),
            new ExtractTextPlugin("css/[name].[chunkhash:8].min.css"),
            new HtmlWebpackPlugin({
                title : item.title,
                filename: item.page+'.[chunkhash:8].html', //输出文件名
                template: 'template/'+item.page+'.html',
                minify : {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunks : [item.page,'vendor']
            })
        ]
    }

    configArr.push(json);
});


module.exports = configArr;
