import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "Motionz",
      formats: ["es", "umd"],
      fileName: (format) => `motionz.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
