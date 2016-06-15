const path = require('path');

module.exports = {
  entry: [
    './src/polyfills.ts',
    './src/bootstrap.ts'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    cache: true,
    root: __dirname,
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: [/node_modules\//],
        loader: 'ts-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    stats: { chunkModules: false },
  }
};
