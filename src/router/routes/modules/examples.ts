import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const EXAMPLES_ROUTE: AppRouteRecordRaw = {
  path: "/examples",
  name: "Examples",
  redirect: "/examples/fetching-data",
  component: LAYOUT,
  meta: {
    title: "示例",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "fetching-data",
      name: "FetchingDataPage",
      component: () => import("@/views/examples/fetching-data.vue"),
      meta: {
        title: "获取数据",
      },
    },
  ],
};

export default EXAMPLES_ROUTE;