import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import "../src/tailwind.css";

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
