import type { AppRouteRecordRaw } from "@/router/types";
import { LAYOUT } from "@/router/constant";

const SHALLOWREF_ROUTE: AppRouteRecordRaw = {
  path: "/shallowref",
  name: "Shallowref",
  redirect: "/shallowref/example_1",
  component: LAYOUT,
  meta: {
    title: "shallowRef",
    hiddenChildrenInMenu: false,
  },
  children: [
    {
      path: "example_1",
      name: "Example_1Page",
      component: () => import("@/views/shallowref/example_1.vue"),
      meta: {
        title: "示例1：直接替换整个数组的数据",
      },
    },
  ],
};

export default SHALLOWREF_ROUTE;
