const path = require("path");
const jsonImporter = require("node-sass-json-importer");

module.exports = {
  title: "dripup - Styleguide",

  template: path.join(__dirname, "styleguide/index.html"),

  assetsDir: path.join(__dirname, "public"),

  components: "src/js/components/**/*.js",

  getExampleFilename: componentpath => {
    const dirname = path.dirname(componentpath);

    return `${dirname}/README.md`;
  },

  updateWebpackConfig: webpackConfig => {
    const include = path.join(__dirname, "src");

    webpackConfig.entry.push(path.join(__dirname, "src/sass/style.scss"));

    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include,
        loader: "babel"
      },
      {
        test: /\.json$/,
        include,
        loader: "json"
      },
      {
        test: /\.css$/,
        include,
        loader: "style!css?importLoaders=1"
      },
      {
        test: /\.scss$/,
        include,
        loader: "style!css!sass"
      }
    );

    webpackConfig.sassLoader = {
      importer: jsonImporter
    };

    return webpackConfig;
  }
};
