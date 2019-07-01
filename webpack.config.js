const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const env = process.env.NODE_ENV

module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),
    mode: env,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'build.js'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(css|sass|)$/i,
            loader: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        }]
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        noInfo: true
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}