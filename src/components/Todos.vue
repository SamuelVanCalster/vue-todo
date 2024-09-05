<script setup>
import { ref, onMounted } from "vue";
import { nanoid } from "nanoid";
import { IoCheckmarkCircleOutline } from "oh-vue-icons/icons";
import { OhVueIcon } from "oh-vue-icons";

const todos = ref([]);
const newTodo = ref("");
const error = ref("");

const fetchTodos = async () => {
  const data = await (
    await fetch("https://dummyjson.com/todos?limit=3")
  ).json();
  todos.value = data.todos.map((todo) => ({
    id: nanoid(),
    todo: todo.todo,
    done: false,
  }));
};
onMounted(() => fetchTodos());

const addTodo = (e) => {
  e.preventDefault();
  if (newTodo.value.trim().length === 0) {
    error.value = "Todo cannot be empty";
    return;
  } else if (newTodo.value.trim().length > 200) {
    error.value = "Todo cannot be longer than 200 characters";
    return;
  }
  todos.value.push({ id: nanoid(), todo: newTodo.value, done: false });
  newTodo.value = "";
  error.value = "";
};
</script>

<template>
  <div class="grid rounded-lg max-w-[90%] mx-auto p-4 bg-[#363636]">
    <div class="grid gap-2">
      <form
        action=""
        @submit.prevent="addTodo"
        class="relative min-w-full bg-[#242424] rounded-lg"
      >
        <input
          type="text"
          v-model="newTodo"
          class="outline-none p-1 bg-[#242424] text-gray-50 rounded-lg w-[calc(100%-25px)]"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          class="text-gray-500 text-3xl absolute right-1 bottom-[1.5px]"
        >
          +
        </button>
      </form>
      <p v-if="error && newTodo.trim().length < 1" class="text-red-500">
        {{ error }}
      </p>
      <ul class="text-white">
        <li
          class="flex justify-between gap-3 line-clamp-2"
          v-for="todo in todos"
          :key="todo.id"
        >
          <p
            v-if="todo.done"
            class="line-through decoration-green-500 decoration-2"
          >
            {{ todo.todo }}
          </p>
          <p v-else>{{ todo.todo }}</p>
          <div class="flex gap-2 items-center">
            <button @click="todo.done = !todo.done">
              <v-icon
                v-if="!todo.done"
                name="io-checkmark-circle-sharp"
                color="gray"
                class="w-5 h-5"
              />
              <v-icon
                v-else
                name="io-checkmark-circle-sharp"
                color="green"
                class="w-5 h-5"
              />
            </button>

            <button
              class="text-red-500"
              @click="todos.splice(todos.indexOf(todo), 1)"
            >
              <v-icon name="bi-trash3-fill" color="light-red" class="w-5 h-5" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
