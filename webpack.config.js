const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");




const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log("Dev mode is on: ", isDev);

const optimization = () => {

  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }

  return config;
};

const babelOptions = (preset) => {

  const options = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
    ],
  };

  if (preset) {
    options.presets.push(preset)
  }

  return options;
}

module.exports = {
  mode: 'development',
  entry: {
    index: ['@babel/polyfill', './src/index.tsx'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext]',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  performance: {
    maxEntrypointSize: 51200000,
    maxAssetSize: 51200000
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Uchi.ru',
      template: './src/index.html',
      // favicon: './src/assets/favicon.ico',
      minify: {
        collapseWhitespace: isProd
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: path.resolve(__dirname, './src'),
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader",],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(),
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(),
        }
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions('@babel/preset-react'),
        }
      },
    ]
  }
}
