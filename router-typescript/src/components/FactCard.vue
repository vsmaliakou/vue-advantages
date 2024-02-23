<script lang="ts">
import { facts } from "@/assets/facts";
import { computed } from "vue";

export default {
  props: {
    factId: {
      type: Number,
      required: true,
      validator: (v) => typeof v === "number" && v >= 0 && v < facts.length,
    },
  },
  setup(props) {
    const fact = computed(() => facts[props.factId]);

    return { fact };
  },
};
</script>

<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-auto">
        <img :src="fact.image" height="200" />
      </div>

      <div class="col-sm-6 col-md-7 align-self-center m-3">
        <div class="card-body t">
          <h5 class="card-title">Cat Fact #{{ factId }}</h5>

          <p class="card-text">{{ fact.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
