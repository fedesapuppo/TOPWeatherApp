const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                minify: isProduction ? {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                } : false
            }),
            new HtmlWebpackPlugin({
                template: './src/404.html',
                filename: '404.html',
                inject: false,
                minify: isProduction ? {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                } : false
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
        },
        performance: {
            hints: isProduction ? 'warning' : false
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map'
    };
};