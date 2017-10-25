let webpack = require('webpack');
let path = require('path');
let inProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/scss/main.scss'
        ]//this is my app entry point
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']//[array if multiple loader are used]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]

};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}