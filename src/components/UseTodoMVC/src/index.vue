<template>
  <div class="todoMVC">
    <h2 style="text-align: center; line-height: 3">TodoMVC</h2>
    <div class="opt">
      <input
        v-model="title"
        type="text"
        autofocus
        placeholder="What needs to be done?"
        @keydown.enter="addTodo"
      />
    </div>
    <ul class="todos">
      <li v-for="(todo, idx) of result" :key="todo.id">
        <i class="del" @click="delTodo(idx)">&times;</i>
        <input
          type="checkbox"
          v-model="todo.completed"
          class="checkbox"
          @change="toggleCompleted(todo)"
        />
        <div class="box">
          <div
            :class="{ done: todo.completed }"
            class="title"
            @dblclick="setEditTodo(todo)"
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
        @click="cleanCompleted"
        >Clean completed</a
      >
      <div class="remaining">
        <input :checked="remaining === 0" type="checkbox" @change="toggleAll" />
        <span>{{ remaining }} {{ remaining > 1 ? "items" : "item" }} left</span>
      </div>
      <div class="status">
        <a :class="{ active: status === void 0 }" @click="toggleStatus()"
          >All</a
        >
        <a :class="{ active: status === false }" @click="toggleStatus(false)"
          >Active</a
        >
        <a :class="{ active: status === true }" @click="toggleStatus(true)"
          >Completed</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import vFocus from "@/directives/v-focus";
import useTodoMVC from "./useTodoMVC";

const {
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
} = useTodoMVC();
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
          font-weight: bold;
          color: #666;
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
          color: #00f;
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
