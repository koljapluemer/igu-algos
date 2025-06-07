import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  shims: true,
  cjsInterop: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.mjs',
    };
  },
});
