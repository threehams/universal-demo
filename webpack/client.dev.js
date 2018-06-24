const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  name: "client",
  mode: "development",
  target: "web",
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false",
    "react-hot-loader/patch",
    path.resolve(__dirname, "../src/index.tsx"),
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "../buildClient"),
    publicPath: "/static/",
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
        use: [ExtractCssChunks.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".css", ".ts", ".tsx"],
  },
  optimization: {
    runtimeChunk: {
      name: "bootstrap",
    },
    splitChunks: {
      chunks: "initial", // <-- The key to this
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
        },
      },
    },
  },
  plugins: [
    new ExtractCssChunks({
      filename: "[name].css",
      chunkFilename: "[id].css",
      hot: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
