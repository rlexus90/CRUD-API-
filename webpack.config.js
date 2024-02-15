// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
    filename: 'final.js',
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
	target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
			events: require.resolve("events/"),
			"http": require.resolve("stream-http") ,
			"url": require.resolve("url/") ,
			"stream": require.resolve("stream-browserify"),
			

    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
