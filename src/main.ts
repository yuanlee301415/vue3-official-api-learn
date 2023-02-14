import { createApp, version } from "vue";

import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "@/store";
import "./assets/main.css";

console.log("version:", version);

function bootstrap() {
  const app = createApp(App);
  console.log("app:", app);
  console.log("app.version:", app.version);
  setupRouter(app);
  setupStore(app);
  app.mount("#app");
}

bootstrap();
