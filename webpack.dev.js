const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: 'web',
    stats: {
        colors: true,
        env: true,
    },
    entry: path.resolve(__dirname, './src/index.js'),
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['react-hot-loader/babel'],
                    },
                },
            },
            {
                test: /\.s?css$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        // Creates `style` nodes from JS strings
                        loader: 'style-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        // Translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
        // Aliasing common directories shorthands
        alias: {
            services: path.resolve(__dirname, 'services/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
        },
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.ProgressPlugin({
            activeModules: true,
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // simplifies creation of HTML files to serve your webpack bundles.
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            title: 'Development',
        }),
        /**
         * extracts CSS into separate files.
         * creates a CSS file per JS file which contains CSS
         * supports On-Demand-Loading of CSS and SourceMaps
         *  */
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        // cleans build directory
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],
};
