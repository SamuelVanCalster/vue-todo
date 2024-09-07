<script setup lang="ts">
import { ref, onMounted } from "vue";
import { nanoid } from "nanoid";
import { Todo } from "../types";

const todos = ref<Todo[]>([]);
const newTodo = ref<string>("");
const error = ref<string>("");
const theme = ref<"light" | "dark">("light");

const fetchTodos = async () => {
  try {
    const data = await (
      await fetch("https://dummyjson.com/todos?limit=3")
    ).json();
    todos.value = data.todos.map((todo: Todo) => ({
      id: nanoid(),
      todo: todo.todo,
      done: false,
    }));
  } catch (error) {
    console.log(error);
  }
};

const addTodo = (e: Event) => {
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

const removeTodo = (id: string) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

const toggleChecked = (id: string) => {
  const todo = todos.value.find((t) => t.id === id);
  if (!todo) return;
  todo.done = !todo.done;
};

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme.value);
};

onMounted(() => {
  fetchTodos();

  localStorage.getItem("theme") &&
  (theme.value = localStorage.getItem("theme") as "light" | "dark")
    ? theme.value
    : (theme.value = "light");
});
</script>

<template>
  <main
    :class="`pt-10 min-h-[100vh] ${
      theme === 'dark' ? 'bg-[#242424]' : 'bg-gray-50'
    }`"
  >
    <div class="mx-auto w-fit mb-2">
      <button
        :class="` ${
          theme === 'dark' ? 'bg-[#363636]' : 'bg-gray-200'
        } rounded-lg p-1 w-8 h-8`"
        @click="toggleTheme"
      >
        <v-icon
          v-if="theme === 'dark'"
          class="w-6 h-6"
          name="co-sun"
          color="white"
        />
        <v-icon v-else name="co-moon" color="black" class="w-6 h-6" />
      </button>
    </div>
    <div
      :class="`grid rounded-lg max-w-[90%] mx-auto p-4 sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[50%] 2xl:max-w-[40%] ${
        theme === 'dark' ? 'bg-[#363636]' : 'bg-gray-200'
      } `"
    >
      <div class="grid gap-2">
        <form
          action=""
          @submit.prevent="addTodo"
          :class="`relative min-w-full ${
            theme === 'dark' ? 'bg-[#242424]' : 'bg-gray-50'
          }  rounded-lg`"
        >
          <input
            type="text"
            v-model="newTodo"
            :class="`outline-none p-1 ${
              theme === 'dark'
                ? 'bg-[#242424] text-gray-50'
                : 'bg-gray-50 text-black'
            }   rounded-lg w-[calc(100%-25px)]`"
            placeholder="Add Todo"
          />
          <button
            type="submit"
            class="text-gray-500 text-3xl absolute right-1 bottom-[1.5px]"
          >
            +
          </button>
        </form>
        <p v-if="error && newTodo.trim().length === 0" class="text-red-500">
          {{ error }}
        </p>
        <ul :class="`${theme === 'dark' ? 'text-white' : 'text-black'} mt-2`">
          <li
            :class="`flex justify-between gap-3 line-clamp-2 border-b ${
              theme === 'dark' ? 'border-[#242424]' : 'border-gray-50'
            } py-[6px] first-of-type:border-y`"
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
              <button @click="toggleChecked(todo.id)">
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

              <button class="text-red-500" @click="removeTodo(todo.id)">
                <v-icon
                  name="bi-trash3-fill"
                  color="light-red"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
