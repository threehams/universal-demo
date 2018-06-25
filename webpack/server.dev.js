const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const res = p => path.resolve(__dirname, p);

const entry = res("../server/render.tsx");
const output = res("../buildServer");

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
// const externals = fs
//   .readdirSync(nodeModules)
//   .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
//   .reduce((externals, mod) => {
//     externals[mod] = `commonjs ${mod}`;
//     return externals;
//   }, {});

// externals["react-dom/server"] = "commonjs react-dom/server";

module.exports = {
  name: "server",
  mode: "development",
  target: "node",
  // devtool: 'source-map',
  devtool: "eval",
  entry: [entry],
  externals: [
    nodeExternals({
      whitelist: [
        /react-universal-component/,
        /webpack-flush-chunks/,
        /universal-import/,
      ],
    }),
  ],
  output: {
    path: output,
    filename: "main.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ExtractCssChunks.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
  },
  plugins: [
    new ExtractCssChunks({ hot: true }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
