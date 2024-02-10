// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/UpLog-frontEnd/",
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
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
    EnvironmentPlugin('all'),
    // ViteFaviconsPlugin({
    //   logo: 'public/logo.svg',
    // }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [
      { find: '@/api', replacement: '/src/api' },
      { find: '@/components', replacement: '/src/components' },
      { find: '@/pages', replacement: '/src/pages' },
      { find: '@/hooks', replacement: '/src/hooks' },
      { find: '@/layouts', replacement: '/src/layouts' },
      { find: '@/recoil', replacement: '/src/recoil' },
      { find: '@/types', replacement: '/src/types' },
      { find: '@/utils', replacement: '/src/utils' },
      { find: '@/typings', replacement: '/src/typings' },
      { find: '@/mocks', replacement: '/src/mocks' },
      { find: '@/', replacement: '/src' },
    ],
  },
});
