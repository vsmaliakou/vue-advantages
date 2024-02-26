import { reactive, computed, readonly } from "vue";

// State
const state = reactive({
  count: 1,
});

// Getters
const times2 = computed(() => state.count * 2);

// Mutations
const inc = (amount) => (state.count += amount);

export default { state: readonly(state), times2, inc };
