import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-svg'
import svgr from '@svgr/rollup'
import replace from '@rollup/plugin-replace'
import rimraf from 'rimraf'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from '../../package.json'

function cleanDist () {
  rimraf.sync('dist/')
  fs.mkdirSync('dist/')
}

cleanDist()

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    url(),
    svgr({
      svgoConfig: {
        plugins: {
          removeViewBox: false
        }
      }
    }),
    babel({
      exclude: '/node_modules/**'
    }),
    commonjs(),
    postcss(),
    nodeResolve({
      browser: true,
      extensions: ['.css', '.mjs', '.js', '.json', '.node']
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    terser()
  ],
  external: ['react', 'react-dom', 'prop-types']
}
