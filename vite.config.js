import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ["v-task-logo.svg"],
      manifest: {
        name: "V-Task Manager",
        short_name: "V-Task",
        description: "Simple app to managing task",
        theme_color: "#F5EEE6",
        icons: [
          {
            src: "v-task-logo.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "v-task-logo.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],

  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  optimizeDeps: {
    exclude: ["react-date-picker"],
  },
});
