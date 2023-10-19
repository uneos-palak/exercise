import { defineConfig } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
server: { port: 8130 },
plugins: [vue(), svgLoader(), dts({ exclude: "src/stories" })],
build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "@uneos/service_extern_excercise1",
      // the proper extensions will be added
      fileName: "service_extern_excercise1",
      // formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "vue",
        "classnames",
        "flowbite",
        "vite-svg-loader",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          classnames: "classNames",
          pinia: "pinia",
          flowbite: "flowbite",
        },
      },
    },
  },
});
