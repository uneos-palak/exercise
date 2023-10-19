import "../tailwind.css";

import app from "./app.vue";
import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { OpenAPI } from "../api";

OpenAPI.BASE = import.meta.env.VITE_OPENAPI_BASE;
OpenAPI.WITH_CREDENTIALS = true;

createApp(app).use(VueQueryPlugin).mount("#app");
