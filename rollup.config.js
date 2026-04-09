import { defineConfig } from 'rollup';
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { string } from 'rollup-plugin-string';

export default defineConfig((commandLineArgs) => {
  const mode = process.env.NODE_ENV || 'development';
  const isProd = mode === 'production';

  return [{
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/browser/sanctum-sdk.js',
        format: 'iife',
        name: 'SanctumDK',
        sourcemap: true,
        plugins: isProd ? [terser()] : []
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        preserveModules: true,
        sourcemap: true
      }
    ],
    plugins: [
      string({ include: '**/*.css' }),
      image(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false
      })
    ]
  }];
});
