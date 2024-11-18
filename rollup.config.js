import typescript from 'rollup-plugin-typescript2';
import image from '@rollup/plugin-image'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

const loadEnv = (mode) => {
	const envFile = mode === 'production' ? '.env.production' : '.env.development';
	const env = dotenv.config({ path: envFile }).parsed || {};
	return {
		'process.env.SANCTUM_URL': JSON.stringify(env.SANCTUM_URL),
		'process.env.SANCTUM_WS_URL': JSON.stringify(env.SANCTUM_WS_URL),
	};
};

export default defineConfig((commandLineArgs) => {
	const mode = commandLineArgs.mode || 'development';
	const env = loadEnv(mode);

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
				values: env,
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
