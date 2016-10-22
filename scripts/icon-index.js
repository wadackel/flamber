import * as fs from "fs";
import * as path from "path";
import glob from "glob";

const globPath = "./src/js/components/svg-icons/*Icon.js";
const writePath = "./src/js/components/svg-icons/index.js";

glob(globPath, {}, (err, files) => {
  const str = files.map(file => {
    const name = path.parse(file).name;
    return `export ${name} from "./${name}";`;
  }).join("\n");

  fs.writeFileSync(writePath, `${str}\n`);

  const result = fs.readFileSync(writePath, { encoding: "utf8" });

  console.log(result); // eslint-disable-line no-console
});
