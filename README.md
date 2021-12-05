# Useless Interface

A collection of UIs that do the wrong things well. Contributions welcome.

## Local development

### Getting started
1. Clone the repo
2. `make test` to run the test suite
2. `make run` to start the development server
3. Open your browser to `http://localhost:3000/`

### Adding a new useless interface

1. Copy one of the apps in `src/apps/:template` to `src/apps/:newthing`.
2. `make run`.
3. Your project should be visible at `localhost:3000/:newthing`. Follow
   whatever file structure you please, so long as the following two files
   exist:

   * `layout.html.ejs` to render your HTML template
   * `index.js` to boostrap your client-side JS


### Tech in use
* [Preact](https://preactjs.com/) for UI components
* [esbuild](https://esbuild.github.io/) for bundling assets
* [Express](https://expressjs.com/) to handle requests
* [Google Cloud Run](https://cloud.google.com/run) for hosting
