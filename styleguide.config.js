const path = require("path");
const glob = require("glob");
const jsonImporter = require("node-sass-json-importer");

module.exports = {
  title: "dripup - Styleguide",

  template: path.join(__dirname, "styleguide/index.html"),

  sections: [
    {
      name: "UI Components",
      components() {
        return glob.sync(path.resolve(__dirname, "src/js/components/ui/**/*.js")).filter(module => {
          if (/\/internal\//.test(module)) return false;

          return /\/[A-Z]\w*\.js$/.test(module);
        });
      }
    },
    {
      name: "SVG Icon Components",
      components: "src/js/components/svg-icons/**/*Icon.js"
    }
  ],

  assetsDir: path.join(__dirname, "public"),

  defaultExample: true,

  highlightTheme: "material",

  getExampleFilename: componentpath => {
    const dirname = path.dirname(componentpath);

    return `${dirname}/README.md`;
  },

  updateWebpackConfig: webpackConfig => {
    const include = path.join(__dirname, "src");

    webpackConfig.entry.push(path.join(__dirname, "src/sass/style.scss"));
    webpackConfig.entry.push(path.join(__dirname, "styleguide/style.css"));

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
        include: [include, path.join(__dirname, "styleguide")],
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
