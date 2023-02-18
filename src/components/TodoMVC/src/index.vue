<template>
  <div class="todoMVC">
    <h2 style="text-align: center; line-height: 3">TodoMVC</h2>
    <div class="opt">
      <input
        v-model="title"
        type="text"
        autofocus
        placeholder="What needs to be done?"
        @keydown.enter="handleAdd"
      />
    </div>
    <ul class="todos">
      <li v-for="(todo, idx) of result" :key="todo.id">
        <i class="del" @click="handleDel(idx)">&times;</i>
        <input
          type="checkbox"
          v-model="todo.completed"
          class="checkbox"
          @change="handleToggleCompleted(todo, $event)"
        />
        <div class="box">
          <div
            :class="{ done: todo.completed }"
            class="title"
            @dblclick="handleEdit(todo)"
          >
            {{ todo.title }}
          </div>
          <input
            v-if="editedTodo === todo"
            v-model="editedTodo.title"
            type="text"
            class="edit"
            v-focus
            @blur="doEdit(todo)"
            @keyup.enter="doEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </div>
      </li>
    </ul>
    <div v-show="todos.length" class="bot">
      <a
        v-show="todos.some((_) => _.completed)"
        class="clear"
        @click="handleCleanCompleted"
        >Clean completed</a
      >
      <div class="remaining">
        <input
          :checked="remaining === 0"
          type="checkbox"
          @change="handleToggleAll"
        />
        <span>{{ remaining }} {{ remaining > 1 ? "items" : "item" }} left</span>
      </div>
      <div class="status">
        <a :class="{ active: status === void 0 }" @click="handleToggleStatus()"
          >All</a
        >
        <a
          :class="{ active: status === false }"
          @click="handleToggleStatus(false)"
          >Active</a
        >
        <a
          :class="{ active: status === true }"
          @click="handleToggleStatus(true)"
          >Completed</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { Todo } from "./typing";
import vFocus from "@/directives/v-focus";

const STORAGE_KEY = "vue-todomvc";
const todos = ref<Todo[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
);
console.log("todos:", todos.value);
const title = ref<string>("");
const status = ref<boolean>();
const result = computed(() => {
  if (status.value === undefined) return todos.value;

  return todos.value.filter((_) => {
    if (_.completed === status.value) {
      console.log("filter:", true, _);
      return true;
    }
    console.log("filter:", false, _);
    return false;
  });
});

const remaining = computed(() => {
  return todos.value.filter((_) => !_.completed).length;
});

const editedTodo = ref<Todo | null>();
let beforeEditCache = "";

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
});

function handleEdit(todo: Todo) {
  console.log("handleEdit>todo:", todo);

  editedTodo.value = todo;
  beforeEditCache = todo.title;
}

function doEdit(todo: Todo) {
  console.log("doEdit>editedTodo:", editedTodo);
  /**
   * 当取消编辑时，会触发 `blur` 事件
   * 此时 `editedTodo` 已在 `blur` 事件的逻辑置为 `null`
   */
  if (!editedTodo.value) return;

  const title = editedTodo.value!.title?.trim();
  if (title) {
    todo.title = title;
  } else {
    handleDel(todos.value.findIndex((_) => _.id === todo.id));
  }
  editedTodo.value = null;
}

function cancelEdit(todo: Todo) {
  console.log("cancelEdit>beforeEditCache:", beforeEditCache);
  todo.title = beforeEditCache;
  editedTodo.value = null;
}

function handleToggleCompleted(todo: Todo, evt: Event) {
  console.log(
    "handleToggleCompleted>args:",
    (evt.target as HTMLInputElement).checked
  );
  todo.completedTime = (evt.target as HTMLInputElement).checked
    ? new Date()
    : void 0;
}

function handleAdd() {
  todos.value.push(
    new Todo({
      id: String(Date.now()),
      title: title.value,
      createdTime: new Date(),
      completed: false,
      completedTime: void 0,
    })
  );
  title.value = "";
}

function handleDel(idx: number) {
  todos.value.splice(idx, 1);
}

function handleToggleStatus(value?: boolean) {
  status.value = value;
}

function handleToggleAll(e: Event) {
  const { checked } = e.target as HTMLInputElement;
  todos.value.forEach((_) => {
    _.completed = checked;
    _.completedTime = checked ? new Date() : undefined;
  });
}

function handleCleanCompleted() {
  todos.value = [...todos.value.filter((_) => !_.completed)];
}
</script>

<style scoped lang="less">
.todoMVC {
  .opt {
    input {
      width: 100%;
      padding: 5px 10px;
      line-height: 20px;
    }
  }
  .todos {
    li {
      position: relative;
      height: 40px;
      border-bottom: 1px solid #ccc;
      .checkbox,
      .del {
        position: absolute;
      }
      .box {
        padding-left: 20px;
        height: 100%;
        line-height: 40px;
        .title {
          &.done {
            text-decoration: line-through;
          }
        }
        .edit {
          position: absolute;
          top: 0;
          z-index: 1;
          width: calc(100% - 20px);
          height: 100%;
          line-height: 100%;
          padding: 0 10px;
        }
      }
      .checkbox {
        top: 15px;
        left: 0;
      }
      .del {
        z-index: 0;
        right: 10px;
        font-style: normal;
        float: right;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        display: none;
        &:hover {
          color: #6c6;
        }
      }
      &:hover {
        .del {
          display: block;
        }
      }
    }
  }
  .bot {
    position: relative;
    line-height: 2;
    padding: 10px 0;
    .remaining,
    .clear {
      position: absolute;
    }
    .remaining {
      left: 0;
      * {
        margin-right: 10px;
      }
    }
    .status {
      text-align: center;
      a {
        margin: 0 10px;
        &:hover,
        &.active {
          text-decoration: underline;
        }
      }
    }
    .clear {
      right: 0;
    }
  }
}
</style>
