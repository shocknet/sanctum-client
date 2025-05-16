import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image'
import replace from '@rollup/plugin-replace';
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';



export default defineConfig((commandLineArgs) => {
	const mode = commandLineArgs.mode || 'development';

	return [{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/browser/sanctum-client.js',
				format: 'iife',
				name: "Sanctum",
				sourcemap: true,
				plugins: [terser()],
			},
			{
				dir: 'dist/cjs',
				format: 'cjs',
				exports: 'named',
				sourcemap: true,
			},
			{
				dir: 'dist/esm',
				format: 'esm',
				preserveModules: true,
				sourcemap: true,
			}
		],
		plugins: [
			replace({
				preventAssignment: true,
				values: {
					'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
				},
			}),
			typescript({
				useTsconfigDeclarationDir: true,
				tsconfigOverride: {
					compilerOptions: {
						declarationDir: 'dist/types',
					},
				},
			}),
			image(),
		],
	}];
});
