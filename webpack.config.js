/* eslint-disable no-undef */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};

	if (isProd) {
		config.minimizer = [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin(),
		];
	}
	return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		'css-loader',
	];

	if (extra) {
		loaders.push(extra);
	}
	return loaders;
};

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),

		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './src/icons/favicon.ico'),
					to: path.resolve(__dirname, 'dist/icons/favicon.ico'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
	];
	return base;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev,
	},
	devtool: isDev ? 'source-map' : false,
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader'),
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
			{
				test: /\.csv$/,
				use: ['csv-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
		],
	},
};
