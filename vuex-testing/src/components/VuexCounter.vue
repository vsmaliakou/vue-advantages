<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    by: { type: Number, default: 1 },
  },
  setup(props) {
    const store = useStore();
    const count = computed(() => store?.state.count);

    const inc = () => {
      store.commit('INC', props.by);
    };

    return { count, inc };
  },
};
</script>

<template>
  <h4>{{ count }}</h4>
  <button class="btn btn-primary" @click="inc">Increment (local)</button>
</template>
