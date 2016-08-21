const path = require("path");
const glob = require("glob");
const docgen = require("react-docgen");
const jsonImporter = require("node-sass-json-importer");

module.exports = {
  title: "dripup - Styleguide",

  template: path.join(__dirname, "styleguide/index.html"),

  // https://github.com/sapegin/react-styleguidist/issues/143#issuecomment-235668531
  handlers: docgen.defaultHandlers.concat((documentation, docPath) => {
    // Calculate a display name for components based upon the declared class name.
    if (docPath.value.type === "ClassDeclaration" && docPath.value.id.type === "Identifier") {
      documentation.set("displayName", docPath.value.id.name);

      // Calculate the key required to find the component in the module exports
      if (docPath.parentPath.value.type === "ExportNamedDeclaration") {
        documentation.set("path", docPath.value.id.name);
      }
    }

    // The component is the default export
    if (docPath.parentPath.value.type === "ExportDefaultDeclaration") {
      documentation.set("docPath", "default");
    }
  }),

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
