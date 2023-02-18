<template>
  <div class="todoMVC">
    <h2 class="title">Todos</h2>
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
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ done: todo.completed }">{{ todo.title }}</span>
      </li>
    </ul>
    <div class="bot">
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
        <a @click="handleToggleStatus()">All</a>
        <a @click="handleToggleStatus(false)">Active</a>
        <a @click="handleToggleStatus(true)">Completed</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Todo } from "./typing";

const title = ref<string>("");
const todos: Todo[] = reactive([
  new Todo({
    id: String(Math.random()),
    title: "No-1",
    createdTime: new Date(),
    completed: false,
  }),
  new Todo({
    id: String(Math.random()),
    title: "Yes-1",
    createdTime: new Date(),
    completed: true,
    completedTime: new Date(),
  }),
  new Todo({
    id: String(Math.random()),
    title: "No-2",
    createdTime: new Date(),
    completed: false,
  }),
  new Todo({
    id: String(Math.random()),
    title: "Yes-2",
    createdTime: new Date(),
    completed: true,
    completedTime: new Date(),
  }),
  new Todo({
    id: String(Math.random()),
    title: "Yes-3",
    createdTime: new Date(),
    completed: true,
    completedTime: new Date(),
  }),
]);
const status = ref<boolean>();

const result = computed(() => {
  if (status.value === undefined) return todos;

  return todos.filter((_) => {
    if (_.completed === status.value) {
      console.log("filter:", true, _);
      return true;
    }
    console.log("filter:", false, _);
    return false;
  });
});

const remaining = computed(() => {
  return todos.filter((_) => !_.completed).length;
});

function handleAdd() {
  todos.push(
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
  todos.splice(idx, 1);
}

function handleToggleStatus(value?: boolean) {
  status.value = value;
}

function handleToggleAll(e: Event) {
  const { checked } = e.target as HTMLInputElement;
  todos.forEach((_) => {
    _.completed = checked;
    _.completedTime = checked ? new Date() : undefined;
  });
}

function handleCleanCompleted() {
  let idx: number = -1;
  do {
    todos.splice(idx, 1);
    idx = todos.findIndex((_) => _.completed);
  } while (idx > -1);
}
</script>

<style scoped lang="less">
.todoMVC {
  .title {
    line-height: 3;
    text-align: center;
  }
  .opt {
    input {
      width: 100%;
      padding: 5px 10px;
      line-height: 20px;
    }
  }
  .todos {
    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      span {
        padding-left: 10px;
        &.done {
          text-decoration: line-through;
        }
      }
      i {
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
        i {
          display: block;
        }
      }
    }
  }
  .bot {
    line-height: 2;
    padding: 10px;
    .remaining {
      float: left;
      * {
        margin-right: 10px;
      }
    }
    .status {
      text-align: center;
      a {
        margin: 0 10px;
      }
    }
    .clear {
      float: right;
    }
  }
}
</style>
