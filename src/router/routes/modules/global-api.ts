import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const GLOBAL_API_ROUTE: AppRouteRecordRaw = {
  path: "/global-api",
  name: "Global-api",
  redirect: "/global-api/general",
  component: LAYOUT,
  meta: {
    title: "全局API",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "general",
      name: "GeneralPage",
      component: () => import("@/views/global-api/general.vue"),
      meta: {
        title: "通用",
      },
    },
  ],
};

export default GLOBAL_API_ROUTE;
