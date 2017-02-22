const path = require('path')

module.exports = {
  context: path.resolve('app/js'),
  entry: {
    main: './main',
    banners: './banners'
  },
  resolve: {
    extensions: ['', '.json', '.jsx', '.js'],
    root: [
      path.resolve('app/js')
    ]
  },
  output: {
    path: path.resolve('public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: 'nunjucks-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
