import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import "./styles/main.scss";
import vue3GoogleLogin from 'vue3-google-login'
import VueLazyload from 'vue-lazyload';
const Pinia = createPinia();

const app = createApp(App);
// const CLIENT_ID  = ""
app.use(Pinia).use(router).use(VueLazyload).use(vue3GoogleLogin, {
    clientId: "1063027376982-kdo8qdolo0e7sathuglnvt7h3rjqa6o4.apps.googleusercontent.com"
  }).mount("#app");
