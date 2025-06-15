
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // More restrictive file watching to prevent EMFILE errors
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/*.log',
        '**/coverage/**',
        '**/tmp/**',
        '**/temp/**',
        '**/.DS_Store',
        '**/Thumbs.db'
      ],
      // Reduce polling frequency
      usePolling: false,
      // Limit the number of files being watched
      followSymlinks: false
    },
    // Reduce the number of files being watched by fs
    fs: {
      strict: false
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    exclude: ['lovable-tagger'],
    // Force pre-bundling of commonly used packages
    include: ['react', 'react-dom']
  },
  // Reduce build complexity
  build: {
    // Reduce the number of chunks to minimize file handles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-dialog']
        }
      }
    }
  }
}));
