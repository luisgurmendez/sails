const path = require('path');
module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    writeToDisk: true,
  }
};