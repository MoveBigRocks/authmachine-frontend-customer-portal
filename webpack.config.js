const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'none',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '/images/'
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/fonts/',
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            }
        ],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/customer-portal-static/'
    },
    plugins: [
        new LiveReloadPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
    ]
}