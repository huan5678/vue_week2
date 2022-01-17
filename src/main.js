import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "./index.css";
import router from "./router";

const store = createStore({
  state() {
    return {
      token: "",
      isAuthenticated: false,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    isLogin(state) {
      state.isAuthenticated = true;
    },
    isLogout(state) {
      state.isAuthenticated = false;
    },
  },
});

createApp(App).use(router).use(store).mount("#app");
