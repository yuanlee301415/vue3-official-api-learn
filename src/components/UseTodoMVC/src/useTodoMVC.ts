import { computed, ref, watchEffect } from "vue";

import { Todo } from "./typing";

export default function useTodoMVC() {
  const todos = ref<Todo[]>([]);

  const title = ref("");

  const status = ref<boolean>();

  const result = computed(() => {
    if (status.value === void 0) return todos.value;
    return todos.value.filter((_) => _.completed === status.value);
  });

  const remaining = computed(
    () => todos.value.filter((_) => !_.completed).length
  );

  const editedTodo = ref<Todo | null>(null);

  let beforeEditCache = "";

  watchEffect(async () => {
    todos.value = await (await fetch("/mock-data/todos.json")).json();
  });

  function addTodo() {
    todos.value.push(
      new Todo({
        id: String(Date.now() * Math.random()),
        title: title.value,
        createdTime: Date.now(),
        completed: false,
        completedTime: void 0,
      })
    );
    title.value = "";
  }

  function delTodo(idx: number) {
    todos.value.splice(idx, 1);
  }

  function toggleCompleted(todo: Todo) {
    todo.completedTime = todo.completed ? Date.now() : void 0;
  }

  function setEditTodo(todo: Todo) {
    editedTodo.value = todo;
    beforeEditCache = todo.title;
  }

  function doEdit(todo: Todo) {
    if (!editedTodo.value) return;
    const title = editedTodo.value.title?.trim();
    if (title) {
      todo.title = title;
    } else {
      delTodo(todos.value.findIndex((_) => _.id === todo.id));
    }
    editedTodo.value = null;
    beforeEditCache = "";
  }

  function cancelEdit(todo: Todo) {
    todo.title = beforeEditCache;
    editedTodo.value = null;
    beforeEditCache = "";
  }

  function cleanCompleted() {
    todos.value = [...todos.value.filter((_) => !_.completed)];
  }

  function toggleAll(evt: Event) {
    const { checked } = evt.target as HTMLInputElement;
    todos.value.forEach((_) => {
      _.completed = checked;
      _.completedTime = checked ? Date.now() : void 0;
    });
  }

  function toggleStatus(value?: boolean) {
    status.value = value;
  }

  return {
    todos,
    result,
    title,
    remaining,
    status,
    addTodo,
    delTodo,
    toggleCompleted,
    editedTodo,
    setEditTodo,
    doEdit,
    cancelEdit,
    cleanCompleted,
    toggleAll,
    toggleStatus,
  };
}
