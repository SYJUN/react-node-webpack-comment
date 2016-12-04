
var webpack = require('webpack');
var path = require('path');

//自动生成HTML文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//分离出 css 文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry:{
		index:path.resolve(__dirname,'public/index.js'),
		//打包第三方库
		vendor:['react','react-dom','jquery','showdown']
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'js/[name].[chunkHash:8].js',

		publicPath:'',
		chunkFilename:"[name].[chunkHash:8].js"
	},
	module:{
		loaders:[
			{
				test:/\.(js|jsx)$/,
				loader:'babel',
				exclude:/node_modules/,
				query:{
					presets:['es2015','react']
				}
			},
			{
				test:/\.sass$/,
				loader:ExtractTextPlugin.extract('style','css!sass')
			},
			{
				test:/\.scss$/,
				loader:ExtractTextPlugin.extract('style','css!scss')
			},
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract('style-loader','css?modules!postcss')
			},
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
				test:/\.(png|jpg|gif|woff|woff2)$/,
				//url-loader 后面除了 limit 字段，还可以通过 name 字段来指定图片打包的目录与文件名
				loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
			}
		]
	},

	postcss:[
		require('autoprefixer')
	],
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:__dirname + '/public/index.tmpl.html'
		}),
		new ExtractTextPlugin("css/[name]-[hash].css"),	//分离CSS和JS文件
		//打包第三方库
		new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
    }),
	],
	resolve:{
		root:__dirname,
		extensions:['','.js','.jsx']
	}
};

















