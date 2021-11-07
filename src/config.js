const glob = require("glob");

const config = {
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  STATIC_ROOT: "build/assets",
  ENTRYPOINTS: glob.sync("src/apps/*/index.js"),
};

config.APP_ENV = process.env.APP_ENV || config.NODE_ENV;

config.ESBUILD = {
  bundle: true,
  entryPoints: config.ENTRYPOINTS,
  outdir: config.STATIC_ROOT,
  format: "esm",
};

module.exports = config;
