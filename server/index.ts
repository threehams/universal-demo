require("colors");
import express from "express";
const webpack = require("webpack");
const noFavicon = require("express-no-favicons");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackHotServerMiddleware = require("webpack-hot-server-middleware");
const clientConfig = require("../webpack/client.dev");
const serverConfig = require("../webpack/server.dev");
const clientConfigProd = require("../webpack/client.prod");
const serverConfigProd = require("../webpack/server.prod");

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === "development";
const app = express();
const socket = require("./socket");

// HMR
let currentSocket = socket;
let socketServer: typeof socket;

app.use(noFavicon());

let isBuilt = false;

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true;
    console.log("BUILD COMPLETE -- Listening @ http://localhost:3000".magenta);
  });

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath, stats: { colors: true } };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  if (module.hot) {
    module.hot.accept("./socket", () => {
      if (socketServer) {
        socketServer.close(function() {
          socketServer = socket.startServer(app);
          currentSocket = socket;
        });
      } else {
        socketServer = socket.startServer(app);
        currentSocket = socket;
      }
    });
  }

  compiler.plugin("done", done);
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require("../buildServer/main").default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}
