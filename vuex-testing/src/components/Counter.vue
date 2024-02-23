<script>
import { ref } from "vue";

export default {
  props: {
    by: { type: Number, default: 1 },
  },
  setup(props) {
    const count = ref(0);

    const inc = () => {
      count.value += props.by;
    };

    return { count, inc };
  },
};
</script>

<template>
  <h4>{{ count }}</h4>
  <button class="btn btn-primary" @click="inc">Increment (local)</button>
</template>
