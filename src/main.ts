import { createApp, version } from "vue";
console.log("vue.version:", version);

import * as vue from "vue";
console.log("vue:", vue);

import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "@/store";
import "./assets/main.less";

function bootstrap() {
  const app = createApp(App);
  console.log("app:", app);
  console.log("app.version:", app.version);
  setupRouter(app);
  setupStore(app);
  app.mount("#app");
}

bootstrap();
