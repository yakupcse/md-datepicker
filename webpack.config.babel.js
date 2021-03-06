import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const ENV = process.env.NODE_ENV || 'development';

const demoCSS = new ExtractTextPlugin('demo.css');
const datepickerCSS = new ExtractTextPlugin('DatePickerModal.css');

module.exports = {
  entry: {
    DatePickerModal: './_src/DatePickerModal/index.js',
    demo: './_src/demo/index.js'
  },

  output: {
    path: './dist',
    publicPath: './',
    filename: '[name].js',
    library: ["[name]"],
    libraryTarget: "umd"
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.less'],
    modulesDirectories: [
      `${__dirname}/src/lib`,
      `${__dirname}/node_modules`,
      'node_modules'
    ],
    alias: {
      // components: `${__dirname}/_src/components`,    // used for tests
      // style: `${__dirname}/_src/style`,
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      lib: `${__dirname}/_src/lib`,
      shared: `${__dirname}/_src/shared`
    }
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /src\//,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /DatePickerModal\/.+\.(sass|scss|css)$/,
        loader: datepickerCSS.extract('css?sourceMap!postcss!sass?sourceMap')
      },
      {
        test: /(demo|shared)\/.+\.(sass|scss|css)$/,
        loader: demoCSS.extract('css?sourceMap!postcss!sass?sourceMap')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(xml|html|txt)$/,
        loader: 'raw'
      },
      {
        test: /\.(svg|woff|ttf|eot)(\?.*)?$/i,
        loader: 'file-loader?name=assets/fonts/[name]_[hash:base64:5].[ext]'
      }
    ]
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "./_src/shared/style"),
      path.resolve(__dirname, "./node_modules")
    ]
  },

  postcss: () => [
    autoprefixer({ browsers: 'last 2 versions' })
  ],

  plugins: ([
    demoCSS,
    datepickerCSS,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'md-datepicker demo',
      xhtml: true,
    }),
    new webpack.ProvidePlugin({
      preact: 'preact',
      React: 'preact-compat',
      ReactDOM: 'preact-compat',
    }),
  ]).concat(
    ENV === 'production'
    ? [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: true,
        comments: false,
      }),
    ]
    : []
  ),

  stats: { colors: true },

  devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
    proxy: [
      // OPTIONAL: proxy configuration:
      // {
      //   path: '/optional-prefix/**',
      //   target: 'http://target-host.com',
      //   rewrite: req => { req.url = req.url.replace(/^\/[^\/]+\//, ''); }   // strip first path segment
      // }
    ]
  }
};
