<template>
  <div v-if="!userStore.getters.isLoggedIn" class="d-grid gap-2 col-6 mx-auto">
    <FormLogin />
  </div>

  <div v-else class="text-center">
    <h2>Welcome, {{ userStore.state.name }}</h2>

    <Counter />

    <button class="btn btn-secondary" @click="userStore.logout()">
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Counter from "@/components/Counter.vue";
import FormLogin from "@/components/FormLogin.vue";
import userStore from "@/stores/user";

export default defineComponent({
  name: "App",
  components: { Counter, FormLogin },
  setup() {
    onMounted(userStore.getUser);
    return { userStore };
  },
});
</script>
