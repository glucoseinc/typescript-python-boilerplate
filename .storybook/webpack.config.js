const path = require("path");


module.exports = (baseConfig, env, defaultConfig) => {
  // modify default css rule
  // for(const rule of defaultConfig.module.rules) {
  //   const rex = RegExp(rule.test.source)

  //   if(rex.test('xxx.css')) {
  //     rule.exclude = [
  //       path.resolve('./src/')
  //     ]
  //   } else if(rex.test('xxx.svg')) {
  //     rule.exclude = [
  //       path.resolve('./assets/'),
  //       path.resolve('./src/'),
  //     ]
  //   }
  // }

  // add my configs
  defaultConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      options: {
        useCache: true,
        useBabel: true,
        babelOptions: {
          babelrc: false, /* Important line */
          presets: [
            ["@babel/preset-env", { "targets": "last 2 versions, ios >= 10, android >= 5.0", "modules": false, "useBuiltIns": "usage" }]
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
    //       resourceQuery: /global/,
    //       use: [
    //         'style-loader',
    //         'css-loader',
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
    //       ],
    //     }
    //   ],
    //   include: [
    //     path.resolve('./src/')
    //   ]
    // },
    // {
    //   test: /\.(jpg|png|gif|eot|ttf|woff|woff2|svg)$/,
    //   exclude: [
    //     path.resolve('./src/')
    //   ],
    //   loader: 'file-loader',
    //   query: {
    //     name: 'static/media/[name].[hash:8].[ext]'
    //   }
    // },
    // {
    //   test: /\.svg$/,
    //   exclude: [
    //     /node_modules/,
    //     path.resolve('./assets/')
    //   ],
    //   loader: 'svg-react-loader',
    //   query: {
    //     classIdPrefix: '[name]-[hash:8]__',
    //   }
    // }
  )

  defaultConfig.resolve.extensions.push('.ts', '.tsx', '.css')
  defaultConfig.resolve.alias['@assets'] = path.resolve('./assets/')
  defaultConfig.resolve.alias['@node_modules'] = path.resolve('./node_modules/')
  defaultConfig.resolve.alias['@src'] = path.resolve('./src/')
  // https://github.com/KyleAMathews/deepmerge#webpack-bug
  // https://github.com/webpack/webpack/issues/6584
  // defaultConfig.resolve.alias["deepmerge$"] = path.resolve('node_modules/deepmerge/dist/umd.js');

  return defaultConfig;
};
