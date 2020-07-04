import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/js/main.js',
    output: {
        file: 'dist/filemanager.min.js',
        format: 'iife',
        plugins: [uglify()]
    }
};