<script>
import CustomerList from "@/components/CustomerList.vue";
import CustomerCreate from "@/components/CustomerCreate.vue";
import { useStore } from "vuex";

export default {
  name: "App",
  components: { CustomerList, CustomerCreate },
  setup() {
    const store = useStore();
    store.dispatch("customers/get");
  },
};
</script>

<template>
  <div class="container mt-1">
    <CustomerCreate />
    <CustomerList />
  </div>
</template>
