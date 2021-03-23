import { terser } from 'rollup-plugin-terser';
import getBabelOutputPlugin from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/index.js',
  plugins: [
    serve(),
    livereload({ watch: 'dist' }),
    terser({
      ecma: '5',
      compress: true,
      mangle: true,
    }),
    getBabelOutputPlugin({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, last 2 versions, Firefox ESR, not dead',
          },
        ],
      ],
    }),
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: false,
  },
};
