<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const { state } = useStore();
    const isLoading = computed(() => {
      return state.customers.loading;
    });
    const customers = computed(() => {
      return state.customers.list;
    });

    return { customers, isLoading };
  },
};
</script>

<template>
  <div class="card card-body mt-2">
    <span v-if="isLoading">Loading...</span>
    <div v-else>
      <div v-for="customer in customers" :key="customer.email" class="media">
        <strong>{{ customer.name }}</strong>

        <span class="text-muted ml-2">({{ customer.email }})</span>
      </div>
    </div>
  </div>
</template>
