const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  name: "client",
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
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
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            ascii_only: true,
          },
          compress: {
            comparisons: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new ExtractCssChunks({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
  ],
};
