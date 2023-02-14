import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const COMPOSITION_API_ROUTE: AppRouteRecordRaw = {
  path: "/composition-api",
  name: "Composition-api",
  redirect: "/composition-api/reactivity-core",
  component: LAYOUT,
  meta: {
    title: "组合式API",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "reactivity-core",
      name: "Reactivity-corePage",
      component: () => import("@/views/composition-api/reactivity-core.vue"),
      meta: {
        title: "响应式：核心",
      },
    },
  ],
};

export default COMPOSITION_API_ROUTE;
