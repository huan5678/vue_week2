<script>
import Api, { getCookie } from "../api";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const userName = ref("");
    const userPassword = ref("");
    const store = useStore();
    const router = useRouter();

    function handleSubmit(e) {
      e.preventDefault();

      const api_data = {
        username: userName.value,
        password: userPassword.value,
      };

      const data = {
        method: "post",
        url: "admin/signin",
        data: api_data,
        token: "",
      };

      Api(data)
        .then((res) => {
          res.data.token && store.commit("setToken", res.data.token);
          res.data.token &&
            (document.cookie = `token=${res.data.token}; max-age=3600`);
          res.data.token && store.commit("isLogin");
          res.data.token && router.push("/dashboard");
        })
        .catch((err) => {
          console.dir(err);
        });
    }

    onMounted(() => {
      let cookieToken = getCookie("token");
      cookieToken && router.push("/dashboard");
    });

    return {
      userName,
      userPassword,
      handleSubmit,
    };
  },
};
</script>

<template>
  <main class="flex justify-center items-center h-screen bg-gray-50">
    <div class="container max-w-lg">
      <form
        class="space-y-8 p-8 bg-white rounded shadow-sm"
        @submit.prevent="handleSubmit"
      >
        <legend class="text-4xl text-center">請先登入</legend>
        <div class="">
          <label for="userName" class="mb-4 block">使用者帳號</label>
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="請輸入帳號Email"
            v-model="userName"
            class="p-2 rounded border w-full bg-gray-50 focus:outline-blue-600 invalid:text-blue-600 invalid:border-blue-600 focus:text-blue-600 text-blue-800"
          />
        </div>
        <div>
          <label for="userPassword" class="mb-4 block">使用者密碼</label>
          <input
            id="userPassword"
            type="password"
            class="p-2 rounded border w-full bg-gray-50 focus:outline-blue-600 invalid:text-blue-600 invalid:border-blue-600 focus:text-blue-600 text-blue-800"
            v-model="userPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-lg py-4 w-100 transition duration-300 hover:bg-blue-600"
        >
          登入
        </button>
      </form>
    </div>
  </main>
</template>
