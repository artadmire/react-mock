const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const { entry } = require('./entry.config.js');

const Setting = {
  common: 'common',
  ...process.env,
};

const setAlias = (wbpCfg, k, uri) => {
  wbpCfg.resolve.alias[k] = path.resolve(__dirname, uri);
};

const config = {
  mode: 'development',
  entry: {},
  devtool: Setting.SOURCE_MAP === 'true' ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: Setting.NODE_ENV !== 'production' ? '[name].[hash].js' : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],

      },
      {
        test: /\.less$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules'),
        ],
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: entry.theme, // 配置全局变量  也可以使用globalVars
            javascriptEnabled: true, // 新版本的less-loader需要增加这个属性
          },
        }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.svg/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 代码拆分
  optimization: {
    minimize: Setting.NODE_ENV === 'production', // This is true by default in production mode.
    runtimeChunk: {
      name: 'manifest',
    }, // 把webpack运行代码的提取出来
    splitChunks: {
      chunks: 'initial',
      minChunks: 1,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          test: /common/, // 把公共代码提取出来
          name: Setting.common,
        },
        vendor: { // 提取node_modules中文件 都喜欢把第三方依赖都打包在一起
          test: /([\\/]node_modules[\\/])/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

setAlias(config, 'UTIL', './src/util');
setAlias(config, 'FETCH', './src/util/request');


if (Setting.NODE_ENV === 'production' || Setting.NODE_ENV === 'analyze') {
  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
  config.plugins.push(new UglifyEsPlugin({
    compress: {
      drop_console: true,
    },
  }));
}

if (Setting.ANALYZE === 'true') {
  // eslint-disable-next-line global-require
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  config.plugins.push(new BundleAnalyzerPlugin());
}

Object.keys(entry).forEach((k) => {
  const { main, title } = entry[k];
  config.entry[k] = main;
  config.plugins.push(new Html({
    inject: true,
    title,
    env: Setting.NODE_ENV,
    template: 'public/index.html',
    filename: `${k}.html`,
    chunks: [k, Setting.common, 'vendor', 'manifest'],
    minify: Setting.NODE_ENV === 'production' || Setting.NODE_ENV === 'analyze' ? {
      removeComments: true,
    } : false,
  }));
});

config.devServer = {
  host: '0.0.0.0',
  open: true,
};

module.exports = config;
