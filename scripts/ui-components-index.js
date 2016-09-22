"use strict";

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const globPath = "./src/js/components/ui/**/*.js";
const globIgnorePath = [
  "./src/js/components/ui/index.js",
  "./src/js/components/ui/internal/**/*"
];
const writePath = "./src/js/components/ui/index.js";

glob(globPath, { ignore: globIgnorePath }, (err, files) => {
  const str = files.map(file => {
    const name = path.parse(file).name;
    return `export ${name} from "./${name}/${name}";`;
  }).join("\n");

  fs.writeFileSync(writePath, `${str}\n`);

  const result = fs.readFileSync(writePath, { encoding: "utf8" });

  console.log(result); // eslint-disable-line no-console
});
