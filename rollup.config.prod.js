import filesize from "rollup-plugin-filesize";
import { uglify } from "rollup-plugin-uglify";
// import { minify } from "uglify-es";

import baseConfig from "./rollup.config.base.js";
import pkg from "./package.json" assert { type: "json" };

// banner
const banner =
  `${"/*!\n" + " * "}${pkg.name}.js v${pkg.version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${pkg.author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

// 支持输出 []
export default [
  // .js, .cjs.js, .esm.js
  {
    ...baseConfig,
    output: [
      // umd development version with sourcemap
      {
        file: `dist/${pkg.name}.umd.min.js`,
        format: "umd",
        name: pkg.name,
        banner,
        sourcemap: false,
      },
      // cjs and esm version
      {
        file: `dist/${pkg.name}.min.cjs`,
        format: "cjs",
        banner,
        name: pkg.name,
        sourcemap: false,
      },
      // cjs and esm version
      {
        file: `dist/${pkg.name}.esm.min.mjs`,
        format: "es",
        banner,
        name: pkg.name,
        sourcemap: false,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      filesize(),
      uglify(
        {
          compress: {
            drop_console: true,
          },
        },
        // minify,
      ),
      filesize(),
    ],
  },
  // .min.js
  // {
  //   ...baseConfig,
  //   output: [
  //     // umd with compress version
  //     {
  //       file: `dist/${name}.min.js`,
  //       format: "umd",
  //       name,
  //       banner,
  //     },
  //   ],
  //   plugins: [
  //     ...baseConfig.plugins,
  //     uglify(
  //       {
  //         compress: {
  //           drop_console: true,
  //         },
  //       },
  //       minify,
  //     ),
  //     filesize(),
  //   ],
  // },
];
