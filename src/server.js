const path = require("path");

const express = require("express");
const compression = require("compression");
const favicon = require("serve-favicon");

const assets = require("./assets");
const config = require("./config");

async function createApp() {
  const BASEPATH = path.join(__dirname, "apps");
  const app = express();
  app.use(favicon(path.join(__dirname, "..", "public", "favicon.png")));
  app.use(compression());

  app.use("/assets", assets.middleware(config));

  app.get("/:app", (req, res) => {
    const layout = path.join(BASEPATH, req.params.app, "layout.html.ejs");
    res.render(layout, {
      js: `/assets/${req.params.app}/index.js`,
    });
  });

  app.get("/", (req, res) => {
    res.send("Useless Interface");
  });

  return app;
}

createApp().then((app) => {
  app.listen(config.PORT, () => {
    console.log(`Server up on port ${config.PORT}`);
  });
});
