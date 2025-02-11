import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
// import dynamicImport from 'vite-plugin-dynamic-import';


import tsconfigPaths from "vite-tsconfig-paths"




dotenv.config();

const getHash = (s: string) =>
    s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      VITE_MODE: JSON.stringify(mode),
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        pages: path.resolve(__dirname, 'src/pages'),
        stores: path.resolve(__dirname, 'src/stores'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        types: path.resolve(__dirname, 'src/types'),
        helpers: path.resolve(__dirname, 'src/helpers'),
      },
    },
    base: '/',
    css: {
      modules: {
        generateScopedName: (name, filename, css) => {
          const componentName = filename
              .replace(/\.module\.\w+$/, '')
              .split('/')
              .pop();

          const hash = getHash(css + componentName + name);

          return `${componentName}__${name}__${hash}`;
        },
      },
    },
  };
});