const path = require('path')
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks')
const ManifestPlugin = require('webpack-manifest-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader')


const _resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = (env, argv) => ({
  entry: {
    'index': './src/index.tsx'
  },
  output: {
    path: _resolve('./static'),
    publicPath: '/static/',
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      '@assets': _resolve('assets'),
      '@node_modules': _resolve('node_modules'),
      '@src': _resolve('src')
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  externals: {
    firebase: 'firebase',
    firebaseui: 'firebaseui',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          babelOptions: {
            babelrc: false, /* Important line */
            presets: [
              ["@babel/preset-env", { "modules": false, "useBuiltIns": "usage" }]
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import"
            ]
          },
          babelCore: "@babel/core", // needed for Babel v7
        }
      },
      // {
      //   test: /\.css$/,
      //   oneOf: [
      //     {
      //       resourceQuery: /^\?global$/,
      //       use: [
      //         'style-loader',
      //         'css-loader',
      //         'postcss-loader'
      //       ]
      //     },
      //     {
      //       use: [
      //         'style-loader',
      //         {
      //           loader: 'css-loader',
      //           options: {
      //             importLoaders: 1,
      //             localIdentName: '[name]__[local]--[hash:base64:8]',
      //             modules: true
      //           }
      //         },
      //         'postcss-loader'
      //       ]
      //     }
      //   ]
      // },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__'
        },
        include: _resolve('src')
      },
      {
        test: /\.(jpg|png|gif|eot|ttf|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ],
        include: _resolve('assets')
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new ManifestPlugin(),
    new CleanObsoleteChunks({verbose: true, deep: true})
  ],
  ...(argv.mode == 'development' ? {
    devtool: 'inline-source-map'
  } : {})
})
