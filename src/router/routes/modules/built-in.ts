import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const BUILT_IN_ROUTE: AppRouteRecordRaw = {
  path: "/built-in",
  name: "BuiltIn",
  redirect: "/built-in/directives",
  component: LAYOUT,
  meta: {
    title: "内置内容",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "directives",
      name: "DirectivesPage",
      component: () => import("@/views/built-in/directives.vue"),
      meta: {
        title: "指令",
      },
    },
  ],
};

export default BUILT_IN_ROUTE;
