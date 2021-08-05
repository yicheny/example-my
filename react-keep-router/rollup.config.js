import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from 'rollup-plugin-uglify'

export default [
    {
        input: 'src/index.jsx',
        output: {
            name: 'keepRouter',
            file: 'lib/index.js',
            format: 'cjs',
            sourcemap: true
        },
        external: [
            'react',
            "react-dom",
            'react-router-dom',
            'invariant',
        ],
        plugins: [
            uglify(),
            resolve(),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            })
        ]
    },
]
