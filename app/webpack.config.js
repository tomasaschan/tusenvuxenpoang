const path = require('path'),
    webpack = require('webpack'),
    HtmlWebPackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const PORT = process.env.CLIENT_PORT || 3001;

const entries = process.env.NODE_ENV === 'production'
    ? ['react-hot-loader/patch',
        'whatwg-fetch',
        './src/index.jsx']
    : ['react-hot-loader/patch',
        `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
        'webpack/hot/only-dev-server',
        'whatwg-fetch',
        './src/index.jsx']

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../public',
        hot: true,
        port: PORT,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve('./src'),
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap'
                }))
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Tusen vp',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
