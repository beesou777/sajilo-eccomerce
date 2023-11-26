import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import "./styles/main.scss";
import VueLazyload from 'vue-lazyload';
const Pinia = createPinia();

const app = createApp(App);
app.use(Pinia).use(router).use(VueLazyload).mount("#app");
