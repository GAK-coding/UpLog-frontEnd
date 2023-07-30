// vite.config.ts
import { defineConfig } from "file:///Users/chaeyoung/Desktop/UpLog/UpLog-frontEnd/.yarn/__virtual__/vite-virtual-03061d6757/0/cache/vite-npm-4.4.2-30a21cad61-37a1c3a0cc.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/chaeyoung/Desktop/UpLog/UpLog-frontEnd/.yarn/__virtual__/@vitejs-plugin-react-virtual-81e61ab69c/0/cache/@vitejs-plugin-react-npm-4.0.2-b1cf72007e-07eeb28ad0.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import ckeditor5 from "file:///Users/chaeyoung/Desktop/UpLog/UpLog-frontEnd/.yarn/unplugged/@ckeditor-vite-plugin-ckeditor5-npm-0.1.3-c1ec6d3287/node_modules/@ckeditor/vite-plugin-ckeditor5/dist/index.mjs";
import { createRequire } from "node:module";
import ViteFaviconsPlugin from "file:///Users/chaeyoung/Desktop/UpLog/UpLog-frontEnd/.yarn/__virtual__/vite-plugin-favicon-virtual-ff206887ae/0/cache/vite-plugin-favicon-npm-1.0.8-1a974a127a-ede25e0861.zip/node_modules/vite-plugin-favicon/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/chaeyoung/Desktop/UpLog/UpLog-frontEnd/vite.config.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var vite_config_default = defineConfig({
  // base: "/UpLog-frontEnd/",
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react"
            }
          ],
          ["@babel/plugin-transform-react-jsx", { pragma: "__cssprop" }, "twin.macro"]
        ]
      }
    }),
    ViteFaviconsPlugin({
      logo: "public/logo.svg"
    }),
    ckeditor5({ theme: require2.resolve("@ckeditor/ckeditor5-theme-lark") })
  ],
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: [
      { find: "@/api", replacement: "/src/api" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/pages", replacement: "/src/pages" },
      { find: "@/hooks", replacement: "/src/hooks" },
      { find: "@/layouts", replacement: "/src/layouts" },
      { find: "@/recoil", replacement: "/src/recoil" },
      { find: "@/types", replacement: "/src/types" },
      { find: "@/utils", replacement: "/src/utils" },
      { find: "@/typings", replacement: "/src/typings" },
      { find: "@/", replacement: "/src" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hhZXlvdW5nL0Rlc2t0b3AvVXBMb2cvVXBMb2ctZnJvbnRFbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9jaGFleW91bmcvRGVza3RvcC9VcExvZy9VcExvZy1mcm9udEVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hhZXlvdW5nL0Rlc2t0b3AvVXBMb2cvVXBMb2ctZnJvbnRFbmQvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy50c1xuLy8gaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBja2VkaXRvcjUgZnJvbSAnQGNrZWRpdG9yL3ZpdGUtcGx1Z2luLWNrZWRpdG9yNSc7XG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSAnbm9kZTptb2R1bGUnO1xuaW1wb3J0IFZpdGVGYXZpY29uc1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1mYXZpY29uJztcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBiYXNlOiBcIi9VcExvZy1mcm9udEVuZC9cIixcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIHRhcmdldDogJ2VzMjAyMCcsXG4gICAgfSxcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvODY0NCNpc3N1ZWNvbW1lbnQtMTE1OTMwODgwM1xuICAgIGxvZ092ZXJyaWRlOiB7ICd0aGlzLWlzLXVuZGVmaW5lZC1pbi1lc20nOiAnc2lsZW50JyB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICdiYWJlbC1wbHVnaW4tbWFjcm9zJyxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnQGVtb3Rpb24vYmFiZWwtcGx1Z2luLWpzeC1wcmFnbWF0aWMnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleHBvcnQ6ICdqc3gnLFxuICAgICAgICAgICAgICBpbXBvcnQ6ICdfX2Nzc3Byb3AnLFxuICAgICAgICAgICAgICBtb2R1bGU6ICdAZW1vdGlvbi9yZWFjdCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgWydAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3gnLCB7IHByYWdtYTogJ19fY3NzcHJvcCcgfSwgJ3R3aW4ubWFjcm8nXSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgVml0ZUZhdmljb25zUGx1Z2luKHtcbiAgICAgIGxvZ286ICdwdWJsaWMvbG9nby5zdmcnLFxuICAgIH0pLFxuICAgIGNrZWRpdG9yNSh7IHRoZW1lOiByZXF1aXJlLnJlc29sdmUoJ0Bja2VkaXRvci9ja2VkaXRvcjUtdGhlbWUtbGFyaycpIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHsgZmluZDogJ0AvYXBpJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2FwaScgfSxcbiAgICAgIHsgZmluZDogJ0AvY29tcG9uZW50cycsIHJlcGxhY2VtZW50OiAnL3NyYy9jb21wb25lbnRzJyB9LFxuICAgICAgeyBmaW5kOiAnQC9wYWdlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9wYWdlcycgfSxcbiAgICAgIHsgZmluZDogJ0AvaG9va3MnLCByZXBsYWNlbWVudDogJy9zcmMvaG9va3MnIH0sXG4gICAgICB7IGZpbmQ6ICdAL2xheW91dHMnLCByZXBsYWNlbWVudDogJy9zcmMvbGF5b3V0cycgfSxcbiAgICAgIHsgZmluZDogJ0AvcmVjb2lsJywgcmVwbGFjZW1lbnQ6ICcvc3JjL3JlY29pbCcgfSxcbiAgICAgIHsgZmluZDogJ0AvdHlwZXMnLCByZXBsYWNlbWVudDogJy9zcmMvdHlwZXMnIH0sXG4gICAgICB7IGZpbmQ6ICdAL3V0aWxzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL3V0aWxzJyB9LFxuICAgICAgeyBmaW5kOiAnQC90eXBpbmdzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL3R5cGluZ3MnIH0sXG4gICAgICB7IGZpbmQ6ICdALycsIHJlcGxhY2VtZW50OiAnL3NyYycgfSxcbiAgICBdLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZUFBZTtBQUN0QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLHdCQUF3QjtBQU5tSyxJQUFNLDJDQUEyQztBQU9uUCxJQUFNQSxXQUFVLGNBQWMsd0NBQWU7QUFHN0MsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixjQUFjO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxhQUFhLEVBQUUsNEJBQTRCLFNBQVM7QUFBQSxFQUN0RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxjQUNFLFFBQVE7QUFBQSxjQUNSLFFBQVE7QUFBQSxjQUNSLFFBQVE7QUFBQSxZQUNWO0FBQUEsVUFDRjtBQUFBLFVBQ0EsQ0FBQyxxQ0FBcUMsRUFBRSxRQUFRLFlBQVksR0FBRyxZQUFZO0FBQUEsUUFDN0U7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxtQkFBbUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCxVQUFVLEVBQUUsT0FBT0EsU0FBUSxRQUFRLGdDQUFnQyxFQUFFLENBQUM7QUFBQSxFQUN4RTtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sU0FBUyxhQUFhLFdBQVc7QUFBQSxNQUN6QyxFQUFFLE1BQU0sZ0JBQWdCLGFBQWEsa0JBQWtCO0FBQUEsTUFDdkQsRUFBRSxNQUFNLFdBQVcsYUFBYSxhQUFhO0FBQUEsTUFDN0MsRUFBRSxNQUFNLFdBQVcsYUFBYSxhQUFhO0FBQUEsTUFDN0MsRUFBRSxNQUFNLGFBQWEsYUFBYSxlQUFlO0FBQUEsTUFDakQsRUFBRSxNQUFNLFlBQVksYUFBYSxjQUFjO0FBQUEsTUFDL0MsRUFBRSxNQUFNLFdBQVcsYUFBYSxhQUFhO0FBQUEsTUFDN0MsRUFBRSxNQUFNLFdBQVcsYUFBYSxhQUFhO0FBQUEsTUFDN0MsRUFBRSxNQUFNLGFBQWEsYUFBYSxlQUFlO0FBQUEsTUFDakQsRUFBRSxNQUFNLE1BQU0sYUFBYSxPQUFPO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVxdWlyZSJdCn0K
