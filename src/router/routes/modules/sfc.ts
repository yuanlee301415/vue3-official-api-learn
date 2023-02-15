import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const SFC_ROUTE: AppRouteRecordRaw = {
  path: "/sfc",
  name: "Sfc",
  redirect: "/sfc/script-setup",
  component: LAYOUT,
  meta: {
    title: "单文件组件",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "script-setup",
      name: "ScriptSetupPage",
      component: () => import("@/views/sfc/script-setup.vue"),
      meta: {
        title: "<script setup>",
      },
    },
  ],
};

export default SFC_ROUTE;
