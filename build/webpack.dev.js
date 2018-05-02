const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entrys = require('../entrys.config.js');

let configArr = [];

entrys.forEach((item)=>{
    let json = {
        entry : {
            [item.page] : './src/pages/'+item.page+'/main.js',
        },
        mode : 'development',
        output : {
            filename : 'js/[name].bundle.js',
        },
        devtool: "cheap-eval-source-map",
        devServer: {
            hot: true,
            compress: true,
            host: '0.0.0.0',
            port: 8888,
            open: true,
            overlay: true
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
                    loader: 'babel-loader',
                    options : {
                        cacheDirectory : true
                    }
                },
                {
                    test : /\.vue$/,
                    exclude: /node_modules/,
                    loader : 'vue-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx','.css'],
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
              jQuery: 'jquery'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            //http:0.0.0.0:8888/[item.page].html
            new HtmlWebpackPlugin({
                title: item.title,
                filename: item.page+'.html',
                template: 'template/'+item.page+'.html'
            })
        ]
    };

    configArr.push(json);
});


module.exports = configArr;
