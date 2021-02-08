import commonjs from '@rollup/plugin-commonjs'
import fs from 'fs'
import autoExternal from 'rollup-plugin-auto-external'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-svg'
import svgr from '@svgr/rollup'
import rimraf from 'rimraf'
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
    svgr(),
    autoExternal(),
    babel({ exclude: '/node_modules/**' }),
    commonjs(),
    postcss(),
    terser()
  ],
  external: ['react', 'react-dom', 'prop-types']
}
