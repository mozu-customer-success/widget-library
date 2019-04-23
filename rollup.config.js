import babel from "rollup-plugin-babel";
import node from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import pkg from "./package.json";
import includePaths from "rollup-plugin-includepaths";
import copy from "rollup-plugin-copy";
import less from "rollup-plugin-less";
import globby from "globby";

let includePathOptions = {
  include: {},
  paths: ["./src/scripts", "./src"],
  external: [],
  extensions: [".js", ".json", ".less"]
};

const { main } = pkg;

let external = [
  "modules/api",
  "backbone",
  "hyprlivecontext",
  "underscore",
  "modules/jquery-mozu",
  "require"
];

const globals = {
  require: "require"
};

let uglifyOptions = {};

let env = process.env;

let ifProduction = (is, otherwise) =>
  env.NODE_ENV === "production" ? is || true : otherwise || false;

let plugins = [
  commonjs({
    sourceMap: ifProduction(false, "inline")
  }),
  node({ browser: true, preferBuiltins: false }),
  includePaths(includePathOptions),
  replace({
    "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV || "developement")
  }),
  less()
];
//would be really nice to not transpile (especially since the source maps are not aligned)
//but mozu-require-compiler chokes on es6
if (true || ifProduction()) {
  plugins.splice(
    1,
    0,
    babel({
      exclude: "node_modules/**",
      sourceMaps: ifProduction(false, "inline")
    })
  );
}

if (ifProduction()) {
  plugins.push(uglify(uglifyOptions));
}

let scripts = globby.sync("src/scripts/widgets/kibo/*.js").map(inputFile => ({
  input: inputFile,
  output: {
    file: inputFile.replace("src", "dist"),
    format: "amd"
  },
  plugins,
  external
}));

export default scripts;
