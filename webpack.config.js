var webpack = require('webpack');

const config = {
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: {
					exposes: ['jQuery', '$']
				}
			}]
		}],
	},
	resolve: {
		alias: {}
	},
	devtool: 'eval-cheap-module-source-map',
	stats: {
		modules: true,
		children: true
	},
	mode: 'development',
	plugins: []
};

if (process.env.NODE_ENV === 'production') {
	config.optimization = {
			minimize: true
		},
		config.devtool = false;
	config.mode = 'production';
};

module.exports = config;