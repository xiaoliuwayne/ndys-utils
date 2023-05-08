import baseConfig from "./rollup.config.base.js";
import serve from "rollup-plugin-serve";

import pkg from "./package.json" assert { type: "json" };

export default {
  ...baseConfig,
  output: [
    {
      file: `dist/${pkg.name}.umd.js`,
      format: "umd",
      name: pkg.name,
      sourcemap: true,
    },
    {
      file: `dist/${pkg.name}.esm.mjs`,
      format: "es",
      name: pkg.name,
      sourcemap: true,
    },
    {
      file: `dist/${pkg.name}.cjs`,
      format: "cjs",
      name: pkg.name,
      sourcemap: "inline",
    },
  ],
  plugins: [
    ...baseConfig.plugins,
    serve({
      port: 8080,
      contentBase: [""],
    }),
  ],
};
