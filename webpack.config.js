var webpack = require('webpack');

const config = {
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader'
			}]
		},{
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: 'jQuery'
			},{
				loader: 'expose-loader',
				options: '$'
			}]
		}],
	},
	resolve: {
		alias: {
		}
	},
	devtool: 'inline-source-map',
	stats: {
		modules: true,
		children: true
	},
	plugins: []
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,					
			compress: { warnings: false },
			output: { comments: false },
		})
	)
	config.devtool = false;
};

module.exports = config;