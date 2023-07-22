// vite.config.ts
// import { defineConfig } from 'vitest/config'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
import ViteFaviconsPlugin from 'vite-plugin-favicon';
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/UpLog-frontEnd/",
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
        ],
      },
    }),
    ViteFaviconsPlugin({
      logo: 'public/logo.svg',
    }),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@recoil', replacement: '/src/recoil' },
      { find: '@types', replacement: '/src/types' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@', replacement: '/src' },
    ],
  },
});
