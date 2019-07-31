import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

const config = {
    input: 'src/scripts/main.js',
    output: {
        file: 'lib/js/main.min.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            mainFields: ['module', 'main'],
            browser: true
        }),
        commonjs(),
        json(),
        replace({
            include: 'src/scripts/main.js',
            ENV: JSON.stringify(env)
        }),
        babel({
            exclude: 'node_modules/**' 
        }),
        eslint({
            fix: true,
            include: ['src/**/*.js']
        }),
        sass({
            output: 'lib/css/index.css',
            insert: true,
            processor: css => postcss(autoprefixer)
                .process(css)
                .then(result => result.css)
        })
    ]
};

if (isProduction) {
    config.output.sourcemap = false;
    config.plugins.push(
        terser()
    );
} else {
    serve({
        open: true,
        contentBase: './',
        historyApiFallback: true,
        host: 'localhost',
        port: 8000
    });
    livereload('lib');
}
export default config;
