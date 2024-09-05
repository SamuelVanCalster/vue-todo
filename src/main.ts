import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  IoCheckmarkCircleSharp,
  BiTrash3Fill,
  CoSun,
  CoMoon,
} from "oh-vue-icons/icons";

addIcons(IoCheckmarkCircleSharp, BiTrash3Fill, CoSun, CoMoon);

createApp(App).component("v-icon", OhVueIcon).mount("#app");
