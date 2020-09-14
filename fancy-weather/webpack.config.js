const path = require('path');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: 'development',
    devtool: isProduction ? 'production' : 'source-map',
    watch: !isProduction,
    entry: ['./src/app/main.js', './src/style/main.scss'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: 'src/favicon.ico'

      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new CopyPlugin([
        {
          from: 'src/assets',
          to: 'public'
        }
      ])
    ],
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader',
            options: {

            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'public'
              }
            }
          ]
        },
        {
          test: /\.(png|svg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.html$/i,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        }
      ]
    }
  };
  return config;
};
