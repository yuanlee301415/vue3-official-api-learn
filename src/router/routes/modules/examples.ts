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
    {
      path: "grid",
      name: "GridPage",
      component: () => import("@/views/examples/grid.vue"),
      meta: {
        title: "排序和过滤器网格",
      },
    },

    {
      path: "tree",
      name: "TreePage",
      component: () => import("@/views/examples/tree.vue"),
      meta: {
        title: "树",
      },
    },

    {
      path: "todos",
      name: "TodosPage",
      component: () => import("@/views/examples/todos.vue"),
      meta: {
        title: "Todos",
      },
    },

    {
      path: "todomvc",
      name: "TodomvcPage",
      component: () => import("@/views/examples/todomvc.vue"),
      meta: {
        title: "TodoMVC",
      },
    },

    {
      path: "use-todomvc",
      name: "UseTodomvcPage",
      component: () => import("@/views/examples/use-todomvc.vue"),
      meta: {
        title: "UseTodoMVC",
      },
    },
  ],
};

export default EXAMPLES_ROUTE;
