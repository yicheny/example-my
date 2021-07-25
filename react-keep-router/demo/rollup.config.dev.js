import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-dev'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from "rollup-plugin-livereload";

export default {
    input:'src/index.jsx',
    output:{
        file:'dist/bundle.cjs.js',
        format:'cjs',
        name:"bundleName",
        sourcemap:true,
    },
    plugins:[
        resolve(),//默认不能获取node_modules内的文件
        commonjs(),//es6模块语法转换
        babel({
           exclude:"node_modules/**"
        }),
        livereload(),//热加载
        serve({
            open:true,
            port:3021,
            contentBase:''
        })
    ],
    external:[

    ],
}
