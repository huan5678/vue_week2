<script>
import { onMounted, ref } from "vue";
import Api from "../api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    let targetProduct = ref({});

    let products = ref([]);

    const store = useStore();
    const router = useRouter();

    function handlerGetTarget(params) {
      this.targetProduct = params;
    }

    const api_path = import.meta.env.VITE_API_PATH;

    const data = {
      method: "get",
      url: `api/${api_path}/admin/products/all`,
      token: store.state.token,
    };

    onMounted(() => {
      !store.state.isAuthenticated
        ? router.push("/")
        : Api(data)
            .then((res) => {
              products = res.data;
            })
            .catch((err) => {
              console.dir(err);
            });
    });

    return {
      targetProduct,
      products,
      handlerGetTarget,
    };
  },
};
</script>

<template>
  <main class="container">
    <div class="flex flex-wrap lg:flex-nowrap justify-around py-4 gap-4">
      <section class="lg:w-1/2">
        <h2 class="text-h2 font-medium mb-8">產品列表</h2>
        <table class="table-auto w-full mb-4">
          <thead class="border-b-2 border-black">
            <tr>
              <td width="200" class="pb-2 font-bold whitespace-nowrap">
                產品名稱
              </td>
              <td width="250" class="pb-2 font-bold whitespace-nowrap">原價</td>
              <td width="250" class="pb-2 font-bold whitespace-nowrap">售價</td>
              <td width="250" class="pb-2 font-bold whitespace-nowrap">
                是否啟用
              </td>
              <td width="150" class="pb-2 font-bold whitespace-nowrap">
                查看細節
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-gray-300 hover:bg-gray-200"
              v-for="item in products"
              :key="item.id"
            >
              <td class="py-2 whitespace-nowrap">{{ item.title }}</td>
              <td class="py-2 whitespace-nowrap">{{ item.origin_price }}</td>
              <td class="py-2 whitespace-nowrap">{{ item.price }}</td>
              <td
                class="py-2 whitespace-nowrap text-green-700"
                v-if="item.is_enabled === 1"
              >
                啟用
              </td>
              <td class="py-2 whitespace-nowrap text-gray-400" v-else>
                未啟用
              </td>
              <td class="py-2 whitespace-nowrap">
                <button
                  type="button"
                  class="text-white bg-blue-500 rounded px-3 py-2 hover:bg-blue-600 transition duration-200"
                  @click="handlerGetTarget(item)"
                >
                  查看細節
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>目前有{{ products.length }}項產品</p>
      </section>
      <section class="lg:w-1/2">
        <div v-if="Object.keys(targetProduct).length === 0">
          <p class="text-gray-400">請選擇一個商品查看</p>
        </div>
        <div v-else>
          <h1 class="text-h2 font-medium">單一產品細節</h1>
          <div
            class="border rounded flex flex-col justify-center items-center mb-4"
          >
            <img
              class="max-h-[300px]"
              :src="targetProduct?.imageUrl"
              :alt="targetProduct?.title"
            />
            <div class="p-4">
              <h2 class="font-bold text-xl mb-2">
                {{ targetProduct?.title }}
                <span
                  class="px-2 py-1 ml-2 rounded text-sm bg-blue-500 text-white"
                >
                  {{ targetProduct?.category }}
                </span>
              </h2>
              <ul class="space-y-4 pb-3">
                <li>商品描述：{{ targetProduct?.description }}</li>
                <li>商品內容：{{ targetProduct?.content }}</li>
                <li>
                  {{ targetProduct?.price }}
                  <span class="pl-1 text-gray-400 line-through">{{
                    targetProduct?.origin_price
                  }}</span>
                  個 / 元
                </li>
              </ul>
            </div>
          </div>
          <div class="px-2 flex gap-4">
            <img
              v-for="img in targetProduct?.imagesUrl"
              :key="img"
              class="max-h-32 object-cover"
              :src="img"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
