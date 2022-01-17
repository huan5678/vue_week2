<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      store.state.isAuthenticated
        ? router.push("/dashboard")
        : router.push("/login");
    });
  },
};
</script>
