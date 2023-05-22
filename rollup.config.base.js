import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
const path = require('node:path')

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json'],
})
const projectRootDir = path.resolve(__dirname)

export default {
  input: [
    'index.js',
    // "src/ajax.js",
    // "src/common.js",
    // "src/deepClone.js",
    // "src/object.js",
  ],
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src'),
          // OR place `customResolver` here. See explanation below.
        },
        {
          find: 'test',
          replacement: path.resolve(projectRootDir, 'test'),
        },
      ],
      customResolver,
    }),
    babel({
      babelHelpers: 'bundled',
      // runtimeHelpers: true,
      exclude: 'node_modules/**', // only transpile our source code
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
    }),

    resolve(),
  ],
}

// import alias from 'rollup-plugin-alias';
// import eslint from 'rollup-plugin-eslint';
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
// import replace from 'rollup-plugin-replace';

// export default {
//   input: 'src/main.js',
//   plugins: [
//     alias({
//       resolve: ['.js']
//     }),
//     replace({
//       'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
//     }),
//     resolve(),
//     commonjs({
//       // non-CommonJS modules will be ignored, but you can also
//       // specifically include/exclude files
//       include: 'node_modules/**'
//     }),
//     eslint({
//       include: ['src/**/*.js']
//     }),
//     babel({
//       runtimeHelpers: true,
//       exclude: 'node_modules/**' // only transpile our source code
//     })
//   ]
// }
