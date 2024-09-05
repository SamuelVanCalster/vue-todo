import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoCheckmarkCircleOutline,IoCheckmarkCircleSharp,BiTrash3Fill  } from "oh-vue-icons/icons";

addIcons(IoCheckmarkCircleOutline, IoCheckmarkCircleSharp,BiTrash3Fill);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/',
          name: 'home',
          component: () => import('./components/Todos.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('./components/About.vue')
        }
      ],
  })

createApp(App).component('v-icon', OhVueIcon).use(router).mount('#app')

