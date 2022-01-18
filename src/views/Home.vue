<script>
import { getCookie } from "../api";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const token = getCookie("token");
    onMounted(() => {
      token && store.commit("isLogin");
      store.state.isAuthenticated
        ? router.push("/dashboard")
        : router.push("/login");
    });
  },
};
</script>
