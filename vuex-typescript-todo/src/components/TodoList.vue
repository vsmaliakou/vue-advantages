<script lang="ts">
import { computed, defineComponent } from "vue";
import TodoItem from "@/components/TodoItem.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { TodoItem },
  setup() {
    const store = useStore();
    const items = computed(() => store.state.items);

    return { items };
  },
});
</script>

<template>
  <TodoItem v-for="item in items" :key="item.id" v-bind="item" />
</template>
