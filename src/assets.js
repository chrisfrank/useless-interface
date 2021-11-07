const express = require("express");

function onDemandMiddleware(root, esbuildOptions) {
  const esbuild = require("esbuild");

  const fileServer = express.static(root);

  function middleware(req, res, next) {
    esbuild
      .build(esbuildOptions)
      .then(() => {
        console.log("serving");
        fileServer(req, res, next);
      })
      .catch(next);
  }

  return middleware;
}

function assetMiddleware(config = {}) {
  if (config.APP_ENV === "development") {
    return onDemandMiddleware(config.STATIC_ROOT, config.ESBUILD);
  }

  return express.static(config.STATIC_ROOT, { etag: true });
}

async function build() {
  const config = require("./config");
  require("esbuild")
    .build(config.ESBUILD)
    .then((result) => {
      console.log("compiled assets:", result);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = {
  middleware: assetMiddleware,
  build,
};
