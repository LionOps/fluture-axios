import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/main.js',
    external: ['axios', 'fluture'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
]
