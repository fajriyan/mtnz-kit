import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
   build: {
      lib: {
         entry: path.resolve(__dirname, "src/index.ts"),
         name: "mtnz",
         formats: ["es", "umd"],
         fileName: (format) => `mtnz.${format}.js`,
      },
      rollupOptions: {
         external: [],
         output: {
            globals: {},
         },
      },
   },
});
