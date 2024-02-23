<script lang="ts">
import FactCard from "@/components/FactCard.vue";
import { ComputedRef, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { FactCard },
  setup() {
    const router = useRoute();
    const factId = computed(() => router.params.id) as ComputedRef<string>;

    return { factId };
  },
};
</script>

<template>
  <FactCard :fact-id="parseInt(factId)" />
</template>
